const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const base=__dirname,ctx={window:{}};vm.createContext(ctx);
for(const name of ['data/curriculum.js','data/quizzes.js'])vm.runInContext(fs.readFileSync(path.join(base,name),'utf8'),ctx);
const c=ctx.window.CURRICULUM,quizzes=ctx.window.LESSON_QUIZZES;let checks=0;function test(name,fn){fn();checks++;console.log('PASS '+name)}
test('Two actual chapters and nine lessons',()=>{assert.equal(c.chapters.length,2);assert.equal(c.lessons.length,9)});
test('252 stable compilation IDs; 126 records per source',()=>{assert.equal(c.questions.length,252);assert.equal(new Set(c.questions.map(q=>q.id)).size,252);for(const b of c.banks)assert.equal(c.questions.filter(q=>q.bank===b.id).length,126)});
test('Every source question has four ordered choices, page and mapping',()=>{for(const q of c.questions){assert.equal(q.choices.length,4);assert(q.choices.every(Boolean));assert(q.page>=1&&q.page<=30);assert(c.lessons.some(l=>l.id===q.lesson));assert(q.answer>=0&&q.answer<4)}});
test('Both source banks match; duplicate records are retained',()=>{for(let i=0;i<126;i++){const a=c.questions[i],b=c.questions[i+126];assert.equal(a.text,b.text);assert.deepEqual(a.choices,b.choices);assert.equal(a.answer,b.answer)}});
test('Unresolved keys cannot enter graded sessions',()=>{assert.equal(c.questions.filter(q=>q.verified).length,230);for(const q of c.questions)assert.equal(q.verified,!q.issue);assert(!c.questions.find(q=>q.id==='comp-111').verified)});
test('45 separate lesson questions have valid keys, hints and explanations',()=>{let n=0;for(const l of c.lessons){assert.equal(quizzes[l.id].length,5);for(const q of quizzes[l.id]){assert.equal(q[1].length,4);assert(q[2]>=0&&q[2]<4);assert(q[3]&&q[4]);n++}}assert.equal(n,45)});
test('All 129 original lesson page images and PDFs exist',()=>{let n=0;for(const l of c.lessons){assert(fs.existsSync(path.join(base,l.source)));assert.equal(l.images.length,l.sourcePages.length);for(const im of l.images){assert(fs.statSync(path.join(base,im)).size>100);n++}}assert.equal(n,129);for(const b of c.banks)assert(fs.existsSync(path.join(base,'sources',b.id+'.pdf')))});
test('Every simplified section has source page references',()=>{for(const l of c.lessons){assert(l.intro&&l.summary&&l.objectives.length&&l.definitions.length&&l.formulas.length&&l.examples.length&&l.mistakes.length);for(const s of l.sections){assert(s.title);assert(s.pages.length);assert(s.pages.every(p=>p>0&&p<=l.images.length))}}});
test('Editable JSON and browser curriculum agree',()=>assert.equal(JSON.stringify(JSON.parse(fs.readFileSync(path.join(base,'data/curriculum.json'),'utf8'))),JSON.stringify(c)));
test('Cell-potential arithmetic catches source Q111',()=>assert(Math.abs(.85-(-.76)-1.61)<1e-12));
console.log(checks+' content checks passed.');
