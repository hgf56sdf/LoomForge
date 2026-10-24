(() => {
  'use strict';
  const C = window.CURRICULUM;
  const app = document.querySelector('#app');
  const sidebar = document.querySelector('#sidebar');
  const crumb = document.querySelector('#breadcrumb');
  const toastEl = document.querySelector('#toast');
  const DB_NAME = 'learnova-language-arts-v2';
  const VERSION = 1;
  const initial = () => ({completed:[], quizScores:{}, answers:{}, mistakes:{}, vocabReview:{}, bookmarks:[], practiceIndex:{}, lastLesson:null, studySessions:0, recent:[]});
  let state = initial();
  let db = null;
  let view = 'dashboard';
  let currentLesson = null;
  let practiceFilter = 'All';
  let searchTimer;
  let toastTimer;
  let flash = {index:0, revealed:false};
  let activeQuiz = null;
  let revision = null;
  let selectedChoice = null;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const pct = (a,b) => b ? Math.round(a / b * 100) : 0;
  const byId = id => [...C.vocabSets,...C.grammarLessons,...C.readingLessons].find(x=>x.id===id);
  const allLessons = [...C.vocabSets,...C.grammarLessons,...C.readingLessons];
  const categoryTitles = {vocabulary:'Vocabulary',grammar:'Grammar',reading:'Reading Skills',practice:'Practice',revision:'Smart Revision',mistakes:'My Mistakes',bookmarks:'Bookmarks',statistics:'Statistics',settings:'Settings & backup',dashboard:'Dashboard'};
  const questionById = id => C.questionBank.find(q=>q.id===id);
  const toast = msg => {toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2300);};

  async function openDb(){
    if(!('indexedDB' in window)) return null;
    return new Promise(resolve=>{
      const req=indexedDB.open(DB_NAME,VERSION);
      req.onupgradeneeded=()=>{const d=req.result;if(!d.objectStoreNames.contains('state'))d.createObjectStore('state');};
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>resolve(null);
    });
  }
  async function loadState(){
    db=await openDb();
    if(db){const saved=await new Promise(resolve=>{const tx=db.transaction('state','readonly');const r=tx.objectStore('state').get('main');r.onsuccess=()=>resolve(r.result);r.onerror=()=>resolve(null);});if(saved)state={...initial(),...saved};}
    else {try{const saved=JSON.parse(localStorage.getItem(DB_NAME)||'null');if(saved)state={...initial(),...saved};}catch{}}
    render();
  }
  function save(){
    const copy=JSON.parse(JSON.stringify(state));
    if(db){try{const tx=db.transaction('state','readwrite');tx.objectStore('state').put(copy,'main');}catch{localStorage.setItem(DB_NAME,JSON.stringify(copy));}}
    else {try{localStorage.setItem(DB_NAME,JSON.stringify(copy));}catch{toast('Could not save progress in this browser.');}}
  }
  function touch(activity){state.studySessions=(state.studySessions||0)+1;state.recent=[{activity,at:new Date().toISOString()},...(state.recent||[])].slice(0,20);save();}
  function navTo(next, filter){view=next;revision=null;activeQuiz=null;selectedChoice=null;if(filter)practiceFilter=filter;sidebar.classList.remove('open');render();window.scrollTo(0,0);}
  function setCrumb(title, sub=''){crumb.innerHTML=`${escapeHtml(title)}${sub?` <span>›</span> ${escapeHtml(sub)}`:''}`;}
  function progressBar(value,label){return `<div class="progress-line"><i style="width:${Math.max(0,Math.min(100,value))}%"></i></div><div class="progress-label"><span>${escapeHtml(label)}</span><span>${value}%</span></div>`;}
  function statCard(label,value,note){return `<article class="card stat-card"><div class="stat-label">${escapeHtml(label)}</div><div class="stat-value">${escapeHtml(value)}</div><div class="stat-note">${escapeHtml(note)}</div></article>`;}
  function button(label,action,kind='ghost',extra=''){return `<button class="button ${kind}" data-action="${escapeHtml(action)}" ${extra}>${escapeHtml(label)}</button>`;}
  function lessonRow(l){const done=state.completed.includes(l.id);return `<div class="lesson-row"><span class="lesson-status ${done?'done':''}">${done?'✓':'·'}</span><div><div class="lesson-name">${escapeHtml(l.title)}</div><div class="lesson-meta">${done?'Completed':'Ready to study'} · ${l.objectives.length} learning goals</div></div><button class="button ghost" data-action="open-lesson" data-id="${l.id}">${done?'Review':'Open lesson'}</button></div>`;}
  function listCard(title,body,action,label){return `<article class="card"><div class="row"><div><h3>${escapeHtml(title)}</h3><div class="muted small">${escapeHtml(body)}</div></div>${button(label,action,'ghost')}</div></article>`;}
  function render(){
    document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
    document.querySelector('.nav-count').textContent=C.questionBank.length;
    const renderer={dashboard:renderDashboard,vocabulary:()=>renderCategory('vocabulary'),grammar:()=>renderCategory('grammar'),reading:()=>renderCategory('reading'),lesson:renderLesson,practice:renderPractice,revision:renderRevision,mistakes:renderMistakes,bookmarks:renderBookmarks,statistics:renderStats,settings:renderSettings};
    (renderer[view]||renderDashboard)();
  }
  function renderDashboard(){
    setCrumb('Dashboard','Overview');
    const attempted=Object.values(state.answers).filter(a=>a.tries>0).length;
    const correct=Object.values(state.answers).filter(a=>a.done&&a.correct).length;
    const complete=state.completed.length;
    const total=allLessons.length;
    const mistakeCount=Object.keys(state.mistakes).length;
    const next=state.lastLesson&&byId(state.lastLesson)||allLessons.find(l=>!state.completed.includes(l.id));
    const cats=[['vocabulary','Vocabulary','Aa'],['grammar','Grammar','¶'],['reading','Reading Skills','▤']];
    app.innerHTML=`<section class="hero"><div><div class="eyebrow">GRADE 12 · UNIT 1</div><h1>Study with confidence.</h1><p>Short lessons, original practice, and progress that stays with you.</p></div><div class="hero-badge">Offline-ready<br><b>35 original questions</b></div></section>
      <div class="grid stats">${statCard('Lessons completed',`${complete} / ${total}`,'Across all learning categories')}${statCard('Practice answered',`${attempted} / ${C.questionBank.length}`,'Original test questions')}${statCard('Practice accuracy',`${pct(correct,attempted)}%`,'Questions eventually correct')}${statCard('Questions to review',mistakeCount,'Mistakes are saved for revision')}</div>
      <h2 class="section-title">Continue learning</h2><div class="card row"><div><div class="label">${next?escapeHtml(categoryTitles[next.category]):'All lessons complete'}</div><h3>${next?escapeHtml(next.title):'Your curriculum is complete'}</h3><div class="muted small">${next?'Pick up where you left off.':'Review any lesson or try Smart Revision.'}</div></div>${next?button('Continue lesson','open-lesson','primary',`data-id="${next.id}"`):button('Smart Revision','go-revision','primary')}</div>
      <h2 class="section-title">Your learning path</h2><div class="grid categories">${cats.map(([id,title,icon])=>{const ls=allLessons.filter(x=>x.category===id);const n=ls.filter(x=>state.completed.includes(x.id)).length;return `<article class="card category-card"><span class="category-icon">${icon}</span><h3>${title}</h3><p>${ls.length} lessons · ${n} complete</p>${progressBar(pct(n,ls.length),'Progress')}<button class="text-button" data-action="go-category" data-id="${id}">Explore ${title} →</button></article>`}).join('')}</div>
      <h2 class="section-title">Practice and review</h2><div class="grid two">${listCard('Original Practice',`${attempted} answered · ${C.questionBank.length} questions`,'go-practice','Open Practice')}${listCard('Smart Revision',`${mistakeCount} saved for review`,'go-revision','Review now')}</div>`;
  }
  function renderCategory(cat){
    const title=categoryTitles[cat], ls=allLessons.filter(x=>x.category===cat), done=ls.filter(x=>state.completed.includes(x.id)).length;
    setCrumb(title,'Lessons');
    app.innerHTML=`<div class="eyebrow">LEARN</div><h1 class="page-title">${title}</h1><p class="subtitle">${cat==='vocabulary'?'Learn the 23 source words in four manageable sets.':cat==='grammar'?'Five focused lessons on rules, patterns, and common traps.':'Seven reading skills with repeatable strategies.'}</p><div class="card content-card"><div class="row"><div><div class="label">Category progress</div><b>${done} of ${ls.length} lessons complete</b></div><span class="pill">${pct(done,ls.length)}%</span></div>${progressBar(pct(done,ls.length),'Completed')}</div><h2 class="section-title">Lessons</h2><div class="lesson-list">${ls.map(lessonRow).join('')}</div>`;
  }
  function cardHtml(card){
    let body='';
    if(card.bullets)body=`<ul>${card.bullets.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`;
    if(card.steps)body=`<ol>${card.steps.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol>`;
    if(card.table)body=`<div class="table-wrap"><table class="table"><tbody>${card.table.map((r,i)=>`<tr>${r.map((c,j)=>i===0||j===0&&card.table[0].length>1?`<th>${escapeHtml(c)}</th>`:`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if(card.example)body+=`<div class="example">${escapeHtml(card.example)}</div>`;
    if(card.note)body+=`<div class="callout">${escapeHtml(card.note)}</div>`;
    if(card.words)body=`<div class="vocab-grid">${card.words.map(w=>wordHtml(w)).join('')}</div>`;
    return `<article class="card content-card"><h3>${escapeHtml(card.title)}</h3>${body}</article>`;
  }
  function wordHtml(w){const [word,pos,meaning,example]=w;const id='word:'+word;const saved=state.bookmarks.includes(id);return `<article class="word-card"><div class="word-head"><div><strong>${escapeHtml(word)}</strong> <span class="pos">${escapeHtml(pos)}</span></div><button class="icon-button ${saved?'saved':''}" aria-label="${saved?'Remove':'Add'} bookmark for ${escapeHtml(word)}" data-action="bookmark" data-id="${escapeHtml(id)}">${saved?'★':'☆'}</button></div><p>${escapeHtml(meaning)}</p><p class="example">${escapeHtml(example)}</p></article>`;}
  function renderLesson(){
    const l=byId(currentLesson);if(!l){navTo('dashboard');return;}state.lastLesson=l.id;save();setCrumb(categoryTitles[l.category],l.title);
    const done=state.completed.includes(l.id),score=state.quizScores[l.id];
    const quizHtml=l.category==='vocabulary'?`<article class="card content-card"><div class="row"><div><div class="label">Optional flashcards</div><h3>Recall the words</h3></div><button class="button ghost" data-action="flash-start">Start flashcards</button></div><p class="muted small">Reveal a meaning, then mark whether you know it or want to review it again.</p></article>`:'';
    const quiz=l.quiz||null;
    app.innerHTML=`<div class="row"><div><div class="eyebrow">${escapeHtml(categoryTitles[l.category])}</div><h1 class="page-title">${escapeHtml(l.title)}</h1></div><button class="icon-button ${state.bookmarks.includes('lesson:'+l.id)?'saved':''}" data-action="bookmark" data-id="lesson:${l.id}" aria-label="Bookmark lesson">${state.bookmarks.includes('lesson:'+l.id)?'★':'☆'}</button></div><p class="subtitle">A compact lesson built from the study guide.</p><div class="objectives">${l.objectives.map(o=>`<span>${escapeHtml(o)}</span>`).join('')}</div>
      ${l.category==='vocabulary'?`<div class="section-actions"><button class="button ghost" data-action="vocab-mode" data-mode="notes">Study notes</button><button class="button ghost" data-action="flash-start">Flashcards</button></div>`:''}
      <div id="lesson-body">${l.category==='vocabulary'?vocabLessonBody(l):l.cards.map(cardHtml).join('')}</div>
      <article class="card content-card"><div class="row"><div><div class="label">Quick Review</div><h3>Remember these points</h3></div><button class="icon-button ${state.bookmarks.includes('review:'+l.id)?'saved':''}" data-action="bookmark" data-id="review:${l.id}" aria-label="Bookmark quick review">${state.bookmarks.includes('review:'+l.id)?'★':'☆'}</button></div><ul>${l.review.map(r=>`<li>${escapeHtml(r)}</li>`).join('')}</ul></article>
      ${quiz?`<article class="card content-card"><div class="label">Lesson quiz</div><h3>Quick check</h3><p>${escapeHtml(quiz.question)}</p><form id="lesson-quiz" class="choices">${quiz.choices.map((c,i)=>`<label class="choice"><input type="radio" name="lesson-answer" value="${i}" required> ${escapeHtml(c)}</label>`).join('')}<button class="button primary" type="submit">Check answer</button></form><div id="lesson-quiz-feedback">${score!==undefined?`<div class="feedback ${score?'':'wrong'}">${score?'Correct.':'Review the lesson and try again.'} ${escapeHtml(quiz.why)}</div>`:''}</div></article>`:''}
      <div class="row content-card"><span class="muted small">${done?'Lesson completed':'Mark complete after reviewing the lesson and quick check.'}</span>${button(done?'Completed ✓':'Mark lesson complete','complete-lesson',done?'ghost':'primary',done?'disabled':'')}</div>
      ${quizHtml}`;
    const form=document.querySelector('#lesson-quiz');if(form)form.addEventListener('submit',e=>{e.preventDefault();const selected=Number(new FormData(form).get('lesson-answer'));const ok=selected===quiz.answer;state.quizScores[l.id]=ok;save();touch(`Lesson quiz: ${l.title}`);document.querySelector('#lesson-quiz-feedback').innerHTML=`<div class="feedback ${ok?'':'wrong'}">${ok?'Correct.':'Not quite.'} ${escapeHtml(quiz.why)}</div>`;if(ok&&!state.completed.includes(l.id)){state.completed.push(l.id);save();}render();});
  }
  function vocabLessonBody(l){return `<div class="vocab-grid">${l.words.map(w=>wordHtml(w)).join('')}</div>`;}
  function startFlash(){const l=byId(currentLesson);if(!l||!l.words)return;flash={index:0,revealed:false};renderFlash();}
  function renderFlash(){const l=byId(currentLesson),w=l?.words?.[flash.index];if(!w)return;const [word,pos,meaning,example]=w;const known=state.vocabReview[word]==='known';document.querySelector('#lesson-body').innerHTML=`<section class="flashcard"><div class="label">Card ${flash.index+1} of ${l.words.length}</div><div class="word">${escapeHtml(word)}</div><div class="pos">${escapeHtml(pos)}</div>${flash.revealed?`<p>${escapeHtml(meaning)}</p><div class="example">${escapeHtml(example)}</div>`:`<p class="muted">Think of the meaning, then reveal it.</p>`}</section><div class="flash-controls">${flash.revealed?`<button class="button ghost" data-action="flash-again">Review again</button><button class="button primary" data-action="flash-known">I know this</button>`:`<button class="button primary" data-action="flash-reveal">Show meaning</button>`}<button class="button ghost" data-action="flash-next">Next word</button><span class="pill">${known?'Marked known':'Not reviewed'}</span></div>`;}
  function renderPractice(){
    if(revision){renderQuestion(revision.ids[revision.index],true);return;}
    const section=practiceFilter==='All'?null:practiceFilter;
    const questions=C.questionBank.filter(q=>!section||q.section===section);
    if(!questions.length){app.innerHTML='<div class="empty">No questions in this section.</div>';return;}
    const key=practiceFilter;let index=Math.min(state.practiceIndex[key]||0,questions.length-1);const qx=questions[index];
    const done=questions.filter(q=>state.answers[q.id]?.done).length;
    setCrumb('Practice',practiceFilter);
    app.innerHTML=`<div class="eyebrow">ORIGINAL MID-TERM PRACTICE</div><h1 class="page-title">Practice</h1><p class="subtitle">Use the original questions and answer key from the study guide. Each question allows up to two attempts.</p><div class="tabs">${['All','Literature','Vocabulary','Grammar'].map(s=>`<button class="tab ${s===practiceFilter?'active':''}" data-action="practice-filter" data-id="${s}">${s}</button>`).join('')}</div><div class="inline-progress"><span>${done} / ${questions.length} completed</span>${progressBar(pct(done,questions.length),'Progress')}</div><div class="stat-inline"><span>Correct <b>${questions.filter(q=>state.answers[q.id]?.done&&state.answers[q.id]?.correct).length}</b></span><span>Need review <b>${questions.filter(q=>state.mistakes[q.id]).length}</b></span><span>Accuracy <b>${pct(questions.filter(q=>state.answers[q.id]?.done&&state.answers[q.id]?.correct).length,questions.filter(q=>state.answers[q.id]?.done).length)}%</b></span></div>${renderQCard(qx,index+1,questions.length,false)}<div class="practice-nav">${button('Previous','practice-prev','ghost',index===0?'disabled':'')}${button('Next question','practice-next','primary',index===questions.length-1?'disabled':'')}</div>`;
    const form=document.querySelector('.practice-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const value=new FormData(form).get('answer-choice');if(value===null){toast('Choose an answer first.');return;}submitAnswer(qx,Number(value),false);});
  }
  function renderQCard(qx,idx,total,isRevision){
    if(!qx)return '<div class="empty">No question selected.</div>';
    const rec=isRevision?revision.attempts[qx.id]:state.answers[qx.id];
    const finished=!!rec?.done;
    const canAttempt=!finished;
    const selected=isRevision?revision.selected:((!finished&&rec?.selected!==undefined)?String(rec.selected):null);
    const reveal=finished;
    const passageHtml=qx.passage?`<div class="passage">${escapeHtml(qx.passage)}</div>`:'';
    const choices=qx.choices.map((c,i)=>{let cls='';if(reveal&&i===qx.answer)cls='correct';if(reveal&&rec?.lastSelected===i&&i!==qx.answer)cls='incorrect';return `<label class="choice ${cls}"><input type="radio" name="answer-choice" value="${i}" ${selected===String(i)?'checked':''} ${canAttempt?'':'disabled'}> <b>${String.fromCharCode(65+i)}.</b> ${escapeHtml(c)}</label>`;}).join('');
    let feedback='';
    if(rec?.done){feedback=`<div class="feedback ${rec.correct?'':'wrong'}">${rec.correct?(rec.tries===1?'Correct on the first attempt.':'Correct on the second attempt.'):'The correct answer is revealed.'} <b>${String.fromCharCode(65+qx.answer)}.</b> ${escapeHtml(qx.explanation)}</div>`;}
    else if(rec?.tries===1){feedback=`<div class="hint"><b>Hint:</b> ${escapeHtml(qx.hint)}<br>You have one more attempt.</div>`;}
    const typeTag=qx.section==='Literature'?'Reading skill':qx.section==='Vocabulary'?'Vocabulary':'Grammar';
    return `<article class="question-card"><div class="question-top"><span>Question ${qx.num} · ${escapeHtml(qx.section)}</span><span class="pill">${escapeHtml(typeTag)} · p. ${qx.page}</span></div>${passageHtml}<p class="question-prompt">${escapeHtml(qx.prompt)}</p><form class="practice-form"><div class="choices">${choices}</div>${feedback}<div class="row content-card"><span class="muted small">${isRevision?'Revision round':`Attempt ${Math.min((rec?.tries||0)+1,2)} of 2`}</span>${canAttempt?'<button class="button primary" type="submit">Submit answer</button>':button('Add bookmark','bookmark','ghost',`data-id="question:${qx.id}"`)}</div></form></article>`;
  }
  function renderQuestion(id,isRevision){
    const qx=questionById(id);if(!qx){revision=null;renderPractice();return;}
    setCrumb(isRevision?'Smart Revision':'Practice',`${qx.section} · Q${qx.num}`);
    const rec=isRevision?revision.attempts[qx.id]:state.answers[qx.id];
    app.innerHTML=`<div class="row"><div><div class="eyebrow">${isRevision?'PERSONALIZED REVIEW':'ORIGINAL MID-TERM PRACTICE'}</div><h1 class="page-title">${isRevision?'Smart Revision':'Practice'}</h1></div>${button(isRevision?'Exit revision':'All questions','practice-exit','ghost')}</div><p class="subtitle">${isRevision?'Review questions previously missed or answered on a second attempt.':'Original question wording and choices are preserved.'}</p><div class="inline-progress"><span>${isRevision?revision.index+1:state.practiceIndex[practiceFilter]||0} / ${isRevision?revision.ids.length:C.questionBank.filter(q=>practiceFilter==='All'||q.section===practiceFilter).length}</span>${progressBar(pct(isRevision?revision.index:state.practiceIndex[practiceFilter]||0,isRevision?revision.ids.length:C.questionBank.length),'Session')}</div>${renderQCard(qx,(isRevision?revision.index:0)+1,isRevision?revision.ids.length:C.questionBank.length,isRevision)}<div class="practice-nav">${button('Previous','practice-prev','ghost',`${(isRevision?revision.index:state.practiceIndex[practiceFilter]||0)===0?'disabled':''}`)}${button(isRevision?'Next review question':'Next question','practice-next','primary')}</div>`;
    const form=document.querySelector('.practice-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const value=new FormData(form).get('answer-choice');if(value===null){toast('Choose an answer first.');return;}submitAnswer(qx,Number(value),isRevision);});
  }
  function submitAnswer(qx,choice,isRevision){
    const target=isRevision?revision.attempts:state.answers;
    const rec=target[qx.id]||{tries:0,done:false,correct:false};
    if(rec.done||rec.tries>=2)return;
    rec.tries++;rec.lastSelected=choice;rec.selected=choice;
    const correct=choice===qx.answer;
    if(correct){rec.done=true;rec.correct=true;rec.successOn=rec.tries;rec.completedAt=new Date().toISOString();}
    else if(rec.tries>=2){rec.done=true;rec.correct=false;rec.completedAt=new Date().toISOString();}
    target[qx.id]=rec;
    if(!correct){const m=state.mistakes[qx.id]||{questionId:qx.id,wrongChoices:[],incorrectAttempts:0,firstAttemptAt:new Date().toISOString(),reviewed:false};m.wrongChoices.push(choice);m.incorrectAttempts++;m.lastAttempt=new Date().toISOString();state.mistakes[qx.id]=m;}
    if(isRevision&&correct&&state.mistakes[qx.id])state.mistakes[qx.id].reviewed=true;
    save();touch(`${isRevision?'Reviewed':'Answered'} ${qx.section} question ${qx.num}`);render();
  }
  function renderRevision(){
    const candidates=C.questionBank.filter(q=>{const a=state.answers[q.id],m=state.mistakes[q.id];return !!m||!!(a?.done&&a.tries===2);}).sort((a,b)=>{const ma=state.mistakes[a.id],mb=state.mistakes[b.id];return (mb?.incorrectAttempts||0)-(ma?.incorrectAttempts||0);});
    const weak=weakTopics();setCrumb('Smart Revision','Priority review');
    if(revision){renderQuestion(revision.ids[revision.index],true);return;}
    app.innerHTML=`<div class="eyebrow">PERSONALIZED REVIEW</div><h1 class="page-title">Smart Revision</h1><p class="subtitle">Use the original question bank. Questions you missed or needed a second attempt on come first.</p><div class="grid stats">${statCard('Questions queued',candidates.length,'Mistakes and second-attempt recoveries')}${statCard('Weak topics',weak.length,'Based on at least three attempts')}${statCard('Still unreviewed',Object.values(state.mistakes).filter(m=>!m.reviewed).length,'Historical mistakes stay saved')}${statCard('Bookmarked',state.bookmarks.length,'Saved for quick access')}</div><div class="section-actions content-card">${button('Start smart revision','start-revision','primary',candidates.length?'':'disabled')}${button('Review unanswered','review-unanswered','ghost')}</div><h2 class="section-title">Weak topics</h2>${weak.length?`<div class="lesson-list">${weak.map(w=>`<div class="lesson-row"><span class="lesson-status">!</span><div><div class="lesson-name">${escapeHtml(w.topic)}</div><div class="lesson-meta">${w.n} questions · ${w.accuracy}% accuracy · ${w.mistakes} mistakes</div></div><button class="button ghost" data-action="topic-practice" data-id="${escapeHtml(w.topic)}">Practice topic</button></div>`).join('')}</div>`:'<div class="empty"><strong>Not enough results yet</strong>Weak topics appear after at least three questions in a topic.</div>'}<h2 class="section-title">Revision queue</h2>${candidates.length?`<div class="lesson-list">${candidates.slice(0,10).map(q=>`<div class="lesson-row"><span class="lesson-status ${state.mistakes[q.id]?.reviewed?'done':''}">${state.mistakes[q.id]?.reviewed?'✓':'↻'}</span><div><div class="lesson-name">${escapeHtml(q.section)} Q${q.num} · ${escapeHtml(q.topic)}</div><div class="lesson-meta">${state.mistakes[q.id]?.reviewed?'Reviewed successfully':'Needs review'}</div></div><button class="button ghost" data-action="review-one" data-id="${q.id}">Review</button></div>`).join('')}</div>`:'<div class="empty"><strong>Your queue is empty</strong>Questions you miss or answer on attempt two will appear here.</div>'}`;
  }
  function weakTopics(){const topics={};C.questionBank.forEach(q=>{const a=state.answers[q.id];if(!a?.done)return;const t=topics[q.topic]||(topics[q.topic]={topic:q.topic,n:0,correct:0,mistakes:0});t.n++;if(a.correct)t.correct++;if(state.mistakes[q.id])t.mistakes++;});return Object.values(topics).filter(t=>t.n>=3).map(t=>({...t,accuracy:pct(t.correct,t.n)})).sort((a,b)=>a.accuracy-b.accuracy);}
  function renderMistakes(){setCrumb('My Mistakes','History');const rows=Object.values(state.mistakes).sort((a,b)=>new Date(b.lastAttempt)-new Date(a.lastAttempt));app.innerHTML=`<div class="eyebrow">REVIEW HISTORY</div><h1 class="page-title">My Mistakes</h1><p class="subtitle">Incorrect attempts remain in your history, including questions later answered correctly.</p>${rows.length?`<div class="lesson-list">${rows.map(m=>{const qx=questionById(m.questionId),a=state.answers[m.questionId];return `<div class="lesson-row"><span class="lesson-status ${m.reviewed?'done':''}">${m.reviewed?'✓':'!'}</span><div><div class="lesson-name">${escapeHtml(qx.section)} Q${qx.num} · ${escapeHtml(qx.topic)}</div><div class="lesson-meta">${m.incorrectAttempts} incorrect attempt${m.incorrectAttempts===1?'':'s'} · ${a?.correct?'later correct':'not yet correct'} · ${m.reviewed?'reviewed successfully':'not reviewed'}</div></div><button class="button ghost" data-action="review-one" data-id="${qx.id}">Review</button></div>`}).join('')}</div>`:'<div class="empty"><strong>No mistakes saved yet</strong>When a practice answer is incorrect, it will appear here.</div>'}`;}
  function renderBookmarks(){setCrumb('Bookmarks','Saved items');const items=state.bookmarks.map(id=>({id,type:id.split(':')[0],key:id.split(':').slice(1).join(':')}));app.innerHTML=`<div class="eyebrow">SAVED FOR LATER</div><h1 class="page-title">Bookmarks</h1><p class="subtitle">Keep words, lessons, quick reviews, and original questions close at hand.</p>${items.length?`<div class="lesson-list">${items.map(it=>{let title=it.key,desc='';if(it.type==='word'){const w=C.vocabSets.flatMap(s=>s.words).find(x=>x[0]===it.key);desc=w?.[2]||'Vocabulary word';}else if(it.type==='lesson'){const l=byId(it.key);title=l?.title||it.key;desc='Lesson';}else if(it.type==='review'){const l=byId(it.key);title=`Quick Review · ${l?.title||it.key}`;desc='Lesson review';}else if(it.type==='question'){const qx=questionById(it.key);title=`${qx?.section} Q${qx?.num}`;desc=qx?.prompt||'';}return `<div class="lesson-row"><span class="lesson-status">☆</span><div><div class="lesson-name">${escapeHtml(title)}</div><div class="lesson-meta">${escapeHtml(desc)}</div></div>${it.type==='lesson'?button('Open','open-lesson','ghost',`data-id="${it.key}"`):it.type==='question'?button('Practice','practice-question','ghost',`data-id="${it.key}"`):''}<button class="icon-button saved" data-action="bookmark" data-id="${escapeHtml(it.id)}" aria-label="Remove bookmark">★</button></div>`}).join('')}</div>`:'<div class="empty"><strong>No bookmarks yet</strong>Use the star beside a word, lesson, or practice question to save it.</div>'}`;}
  function renderStats(){const ans=Object.values(state.answers).filter(a=>a.done), correct=ans.filter(a=>a.correct).length, first=ans.filter(a=>a.correct&&a.tries===1).length, second=ans.filter(a=>a.correct&&a.tries===2).length;const topicRows={};C.questionBank.forEach(q=>{const a=state.answers[q.id];if(!a?.done)return;const t=topicRows[q.topic]||(topicRows[q.topic]={name:q.topic,n:0,ok:0});t.n++;if(a.correct)t.ok++;});setCrumb('Statistics','Your activity');app.innerHTML=`<div class="eyebrow">REAL LEARNING ACTIVITY</div><h1 class="page-title">Statistics</h1><p class="subtitle">Only activity recorded on this device is counted.</p><div class="grid stats">${statCard('Lessons complete',`${state.completed.length} / ${allLessons.length}`,'Marked complete after study')}${statCard('Practice completion',`${ans.length} / ${C.questionBank.length}`,'Finished questions')}${statCard('Practice accuracy',`${pct(correct,ans.length)}%`,'Eventually answered correctly')}${statCard('First-attempt correct',first,'Correct without retry')}</div><div class="grid two content-card">${statCard('Second-attempt recovery',second,'Correct after one retry')}${statCard('Incorrect questions',Object.keys(state.mistakes).length,'Historical mistakes retained')}</div><h2 class="section-title">Topic performance</h2>${Object.keys(topicRows).length?`<div class="lesson-list">${Object.values(topicRows).map(t=>`<div class="lesson-row"><div class="lesson-status">${pct(t.ok,t.n)}%</div><div><div class="lesson-name">${escapeHtml(t.name)}</div><div class="lesson-meta">${t.n} answered · ${t.ok} correct</div></div>${progressBar(pct(t.ok,t.n),'Accuracy')}</div>`).join('')}</div>`:'<div class="empty"><strong>No statistics yet</strong>Answer a few practice questions to see your results.</div>'}<h2 class="section-title">Recent activity</h2>${state.recent.length?`<div class="lesson-list">${state.recent.slice(0,8).map(x=>`<div class="lesson-row"><span class="lesson-status">·</span><div class="lesson-name">${escapeHtml(x.activity)}</div><div class="lesson-meta">${new Date(x.at).toLocaleString()}</div></div>`).join('')}</div>`:'<div class="empty">Study actions will appear here.</div>'}`;}
  function renderSettings(){setCrumb('Settings','Progress backup');app.innerHTML=`<div class="eyebrow">YOUR DEVICE</div><h1 class="page-title">Settings & backup</h1><p class="subtitle">Your study data is stored locally in this browser. Export a backup before switching devices or clearing browser data.</p><div class="card"><div class="setting-row"><div><h3>Export progress</h3><p>Download lessons, attempts, mistakes, bookmarks, and settings as JSON.</p></div><button class="button primary" data-action="export">Export Progress</button></div><div class="setting-row"><div><h3>Import progress</h3><p>Restore a Learnova JSON backup. Existing progress is replaced after validation.</p></div><button class="button ghost" data-action="import-open">Import Progress</button></div><div class="setting-row"><div><h3>Reset progress</h3><p>Permanently clear this browser’s saved study data.</p></div><button class="button danger" data-action="reset">Reset Progress</button></div><input id="import-file" type="file" accept="application/json,.json" hidden></div><div class="callout content-card">Progress is saved in this browser with IndexedDB, with a local-storage fallback. The lesson and practice content is bundled with the site for offline study after the files are available locally.</div>`;}

  function startRevision(ids){const unique=[...new Set(ids)].filter(id=>questionById(id));if(!unique.length){toast('No questions in this review set.');return;}revision={ids:unique,index:0,attempts:{},selected:null};view='practice';practiceFilter='Revision';render();}
  function practiceList(){const section=practiceFilter==='All'?null:practiceFilter;return C.questionBank.filter(q=>!section||q.section===section);}
  function nextPractice(direction){if(revision){revision.index=Math.max(0,Math.min(revision.ids.length-1,revision.index+direction));revision.selected=null;render();return;}const qs=practiceList();const key=practiceFilter;const n=Math.max(0,Math.min(qs.length-1,(state.practiceIndex[key]||0)+direction));state.practiceIndex[key]=n;save();render();}
  function toggleBookmark(id){const i=state.bookmarks.indexOf(id);if(i>=0)state.bookmarks.splice(i,1);else state.bookmarks.push(id);save();render();}
  function exportProgress(){const blob=new Blob([JSON.stringify({format:'learnova-progress-v1',exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='learnova-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Progress backup downloaded.');}
  function validBackup(data){if(!data||data.format!=='learnova-progress-v1'||!data.state||typeof data.state!=='object')return false;const s=data.state;return Array.isArray(s.completed)&&typeof s.answers==='object'&&typeof s.mistakes==='object'&&Array.isArray(s.bookmarks);}
  async function importProgress(file){try{const data=JSON.parse(await file.text());if(!validBackup(data)){toast('This backup is invalid or unsupported.');return;}state={...initial(),...data.state};save();render();toast('Progress restored.');}catch{toast('Could not read this backup file.');}}
  function resetProgress(){if(!confirm('Reset all saved Learnova progress, answers, mistakes, and bookmarks on this device? This cannot be undone.'))return;state=initial();save();render();toast('Progress reset.');}

  function renderSearchResults(query){let box=document.querySelector('.search-results');if(box)box.remove();if(!query.trim())return;const term=query.toLowerCase();const results=[];
    C.vocabSets.forEach(set=>set.words.forEach(w=>{if(w.join(' ').toLowerCase().includes(term))results.push({title:w[0],desc:`Vocabulary · ${w[2]}`,action:'search-word',id:w[0]});}));
    allLessons.forEach(l=>{const text=[l.title,...l.objectives,...l.review].join(' ');if(text.toLowerCase().includes(term))results.push({title:l.title,desc:`${categoryTitles[l.category]} lesson`,action:'open-lesson',id:l.id});});
    C.questionBank.forEach(qx=>{if(`${qx.prompt} ${qx.topic} ${qx.section} ${qx.num} ${qx.passage||''}`.toLowerCase().includes(term))results.push({title:`${qx.section} Q${qx.num} · ${qx.topic}`,desc:qx.prompt,action:'search-question',id:qx.id});});
    box=document.createElement('div');box.className='search-results';box.innerHTML=results.length?results.slice(0,18).map(r=>`<button class="search-result" data-action="${r.action}" data-id="${escapeHtml(r.id)}"><b>${escapeHtml(r.title)}</b><small>${escapeHtml(r.desc).slice(0,150)}</small></button>`).join(''):'<div class="empty">No matching study content.</div>';document.querySelector('.topbar').append(box);
  }
  function onAction(e){const b=e.target.closest('[data-action]');if(!b)return;const {action,id}=b.dataset;
    if(action==='go-category'){navTo(id);return;}if(action==='go-practice'){practiceFilter='All';navTo('practice');return;}if(action==='go-revision'){navTo('revision');return;}
    if(action==='open-lesson'){currentLesson=id;view='lesson';flash={index:0,revealed:false};render();window.scrollTo(0,0);return;}
    if(action==='complete-lesson'){if(currentLesson&&!state.completed.includes(currentLesson)){state.completed.push(currentLesson);touch(`Completed lesson: ${byId(currentLesson).title}`);}render();toast('Lesson marked complete.');return;}
    if(action==='bookmark'){toggleBookmark(id);toast(state.bookmarks.includes(id)?'Bookmarked.':'Bookmark removed.');return;}
    if(action==='practice-filter'){practiceFilter=id;render();return;}
    if(action==='practice-next'){nextPractice(1);return;}if(action==='practice-prev'){nextPractice(-1);return;}
    if(action==='practice-exit'){revision=null;practiceFilter='All';navTo('practice');return;}
    if(action==='start-revision'){const ids=C.questionBank.filter(q=>{const a=state.answers[q.id],m=state.mistakes[q.id];return m||a?.done&&a.tries===2;}).sort((a,b)=>(state.mistakes[b.id]?.incorrectAttempts||0)-(state.mistakes[a.id]?.incorrectAttempts||0)).map(q=>q.id);startRevision(ids);return;}
    if(action==='review-unanswered'){startRevision(C.questionBank.filter(q=>!state.answers[q.id]?.done).map(q=>q.id));return;}
    if(action==='review-one'){startRevision([id]);return;}
    if(action==='topic-practice'){const ids=C.questionBank.filter(q=>q.topic===id).map(q=>q.id);startRevision(ids);return;}
    if(action==='practice-question'||action==='search-question'){revision=null;practiceFilter='All';const idx=C.questionBank.findIndex(q=>q.id===id);state.practiceIndex.All=Math.max(0,idx);save();view='practice';render();window.scrollTo(0,0);return;}
    if(action==='search-word'){const w=C.vocabSets.find(s=>s.words.some(x=>x[0]===id));if(w){currentLesson=w.id;view='lesson';render();}document.querySelector('.search-results')?.remove();return;}
    if(action==='export'){exportProgress();return;}if(action==='import-open'){document.querySelector('#import-file').click();return;}if(action==='reset'){resetProgress();return;}
    if(action==='flash-start'){startFlash();return;}if(action==='flash-reveal'){flash.revealed=true;renderFlash();return;}if(action==='flash-known'||action==='flash-again'){const l=byId(currentLesson),word=l.words[flash.index][0];state.vocabReview[word]=action==='flash-known'?'known':'again';save();flash.revealed=false;flash.index=(flash.index+1)%l.words.length;renderFlash();toast(action==='flash-known'?'Marked as known.':'Added to review.');return;}if(action==='flash-next'){const l=byId(currentLesson);flash.index=(flash.index+1)%l.words.length;flash.revealed=false;renderFlash();return;}
    if(action==='vocab-mode'){document.querySelector('#lesson-body').innerHTML=vocabLessonBody(byId(currentLesson));return;}
  }

  document.addEventListener('click',onAction);
  document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.addEventListener('click',()=>navTo(b.dataset.view)));
  document.querySelector('#menu-button').addEventListener('click',()=>sidebar.classList.toggle('open'));
  document.querySelector('#search').addEventListener('input',e=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>renderSearchResults(e.target.value),130);});
  document.addEventListener('click',e=>{if(!e.target.closest('.search-box')&&!e.target.closest('.search-results'))document.querySelector('.search-results')?.remove();});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();document.querySelector('#search').focus();}if(e.key==='Escape'){sidebar.classList.remove('open');document.querySelector('.search-results')?.remove();}});
  document.addEventListener('change',e=>{if(e.target.id==='import-file'&&e.target.files[0])importProgress(e.target.files[0]);if(e.target.matches('input[name="answer-choice"]')){if(revision)revision.selected=e.target.value;else{const qs=practiceList(),qx=qs[state.practiceIndex[practiceFilter]||0];if(qx){state.answers[qx.id]=state.answers[qx.id]||{tries:0,done:false,correct:false};state.answers[qx.id].selected=Number(e.target.value);save();}}}});
  if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
  loadState();
})();
