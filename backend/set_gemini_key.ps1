# A helper script to safely configure the GEMINI_API_KEY in the backend/.env file on Windows.

$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Error "Could not find .env file at $envFile"
    exit 1
}

$key = Read-Host -Prompt "Enter your GEMINI_API_KEY (input will be hidden)" -AsSecureString
if (-not $key) {
    Write-Warning "No key entered. Exiting."
    exit 0
}

# Convert SecureString to plain text safely
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($key)
$plainKey = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Read the existing .env file, replace the key line, and write back
$content = Get-Content $envFile
$newContent = @()
$found = $false

foreach ($line in $content) {
    if ($line -match "^GEMINI_API_KEY=") {
        $newContent += "GEMINI_API_KEY=$plainKey"
        $found = $true
    } else {
        $newContent += $line
    }
}

if (-not $found) {
    $newContent += "GEMINI_API_KEY=$plainKey"
}

$newContent | Set-Content $envFile
Write-Host "GEMINI_API_KEY successfully updated in .env!" -ForegroundColor Green
