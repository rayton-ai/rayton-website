@echo off
cd /d "c:\Users\rladu\OneDrive\문서\Rayton_web\rayton-website"

REM Use PowerShell to copy and replace
powershell -NoProfile -Command ^
  "$content = Get-Content 'pages\products.html' -Encoding UTF8 -Raw;" ^
  "$content = $content -replace '\.\./css/', 'css/';" ^
  "$content = $content -replace '\.\./js/', 'js/';" ^
  "$content = $content -replace '\.\./images/', 'images/';" ^
  "$content = $content -replace 'href=\"\.\./index\.html\"', 'href=\"index.html\"';" ^
  "$content = $content -replace 'href=\"products\.html\" class=\"active\"', 'href=\"index.html\" class=\"active\"';" ^
  "$content = $content -replace 'href=\"software\.html\"', 'href=\"pages/software.html\"';" ^
  "$content = $content -replace 'href=\"applications\.html\"', 'href=\"pages/applications.html\"';" ^
  "$content = $content -replace 'href=\"developer\.html\"', 'href=\"pages/developer.html\"';" ^
  "$content = $content -replace 'href=\"media\.html\"', 'href=\"pages/media.html\"';" ^
  "$content = $content -replace 'href=\"faq\.html\"', 'href=\"pages/faq.html\"';" ^
  "$content = $content -replace 'href=\"contact\.html\"', 'href=\"pages/contact.html\"';" ^
  "$content = $content -replace 'href=\"products\.html\">Falcon K', 'href=\"index.html\">Falcon K';" ^
  "$content = $content -replace 'href=\"products\.html\">Robin W', 'href=\"index.html\">Robin W';" ^
  "$content = $content -replace 'href=\"products\.html\">Robin E1X', 'href=\"index.html\">Robin E1X';" ^
  "$content = $content -replace 'href=\"products\.html\">Hummingbird HD1', 'href=\"index.html\">Hummingbird HD1';" ^
  "$content = $content -replace 'href=\"products\.html\">Hummingbird HD1-R', 'href=\"index.html\">Hummingbird HD1-R';" ^
  "Set-Content 'index.html' -Value $content -Encoding UTF8;" ^
  "Write-Host 'index.html created successfully'"

echo Done
