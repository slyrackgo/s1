# Скрипт для добавления фотографий к приложению
# Просто укажи пути к своим фото

# Пример использования:
# .\add-images.ps1

$photoDir = "c:\Users\Atai\Desktop\s1\public"

# Создай папку если её нет
if (-not (Test-Path $photoDir)) {
    New-Item -ItemType Directory -Path $photoDir -Force | Out-Null
    Write-Host "✓ Папка создана: $photoDir"
}

Write-Host ""
Write-Host "📸 Помощник по добавлению фото"
Write-Host "================================"
Write-Host ""
Write-Host "Поместите ваши 5-6 фотографий в папку s1 на рабочем столе"
Write-Host "и переименуйте их в:"
Write-Host ""
Write-Host "  📷 image1.jpg  - фото 1"
Write-Host "  📷 image2.jpg  - фото 2"
Write-Host "  📷 image3.jpg  - фото 3"
Write-Host "  📷 image4.jpg  - фото 4"
Write-Host "  📷 image5.jpg  - фото 5"
Write-Host "  📷 image6.jpg  - фото 6 (опционально)"
Write-Host ""
Write-Host "Затем скопируйте их в папку 'public'"
Write-Host "Путь: $photoDir"
Write-Host ""

# Проверим что там есть
$files = @(
    "image1.jpg",
    "image2.jpg", 
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
)

Write-Host "Статус файлов:"
Write-Host "--------------"
foreach ($file in $files) {
    $path = Join-Path $photoDir $file
    if (Test-Path $path) {
        Write-Host "✓ $file - найден!"
    } else {
        Write-Host "✗ $file - не найден"
    }
}

Write-Host ""
Write-Host "После добавления фото обнови браузер (F5)"
