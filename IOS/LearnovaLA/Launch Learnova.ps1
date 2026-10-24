param([switch]$NoOpenBrowser)

$ErrorActionPreference = 'Stop'
$site = $PSScriptRoot
$url = 'http://127.0.0.1:8765/'
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
$pythonPath = $null
$pythonPrefix = ''

$ifPythonUnavailable = -not $pythonCommand
if ($pythonCommand) { $pythonPath = $pythonCommand.Source }
if ($ifPythonUnavailable) {
  $bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
  if (Test-Path -LiteralPath $bundledPython) {
    $pythonPath = $bundledPython
  } else {
    $pythonLauncher = Get-Command py -ErrorAction SilentlyContinue
    if ($pythonLauncher) {
      $pythonPath = $pythonLauncher.Source
      $pythonPrefix = '-3 '
    } else {
      throw 'Python 3 is required to launch the local study site. Install Python 3 or run this in Codex Desktop, which includes a bundled Python runtime.'
    }
  }
}

$serverArgs = $pythonPrefix + '-m http.server 8765 --bind 127.0.0.1 --directory "' + $site + '"'
$server = Start-Process -FilePath $pythonPath -ArgumentList $serverArgs -PassThru -WindowStyle Hidden
try {
  $ready = $false
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    if ($server.HasExited) { throw 'The local web server stopped before it was ready.' }
    $client = [System.Net.Sockets.TcpClient]::new()
    try {
      $connection = $client.BeginConnect('127.0.0.1', 8765, $null, $null)
      if ($connection.AsyncWaitHandle.WaitOne(100)) {
        $client.EndConnect($connection)
        $ready = $true
        break
      }
    } catch { }
    finally { $client.Dispose() }
    Start-Sleep -Milliseconds 100
  }
  if (-not $ready) { throw 'The local web server did not start on port 8765.' }
  Write-Host 'Learnova is running at http://127.0.0.1:8765/'
  Write-Host 'Keep this window open while studying. Press Ctrl+C to stop the local server.'
  if (-not $NoOpenBrowser) { Start-Process $url }
  while (-not $server.HasExited) { Start-Sleep -Seconds 1 }
} finally {
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
}
