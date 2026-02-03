$apiKey = "AIzaSyBwFbdKLE4U8Hw7BAnSELTMyk5b6saqJ5Q"
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey"

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = "Hello, say hi back!"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "Testing Gemini API..." -ForegroundColor Cyan
Write-Host "URL: $url" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "AI Response:" -ForegroundColor Yellow
    Write-Host $response.candidates[0].content.parts[0].text
    Write-Host ""
    Write-Host "Full Response:" -ForegroundColor Gray
    $response | ConvertTo-Json -Depth 10
}
catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow
    Write-Host "Error Message:" -ForegroundColor Yellow
    $_.Exception.Message
    Write-Host ""
    if ($_.ErrorDetails.Message) {
        Write-Host "Details:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}
