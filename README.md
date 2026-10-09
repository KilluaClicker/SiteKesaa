# KESA Messenger — сайт загрузки

## Что входит
- `index.html` и `style.css` — адаптивная страница скачивания.
- `.github/workflows/pages.yml` — автоматическая публикация сайта в GitHub Pages.
- `.github/workflows/build-windows.yml` — сборка Windows EXE из репозитория `KilluaClicker/KesaMessenger` и публикация установщика в Releases этого репозитория.
- `UPLOAD_TO_GITHUB.bat` — помогает загрузить файлы в правильный репозиторий, не в `C:\Users\004ne`.

## Первичная настройка сайта
После загрузки файлов открой `https://github.com/KilluaClicker/SiteKesaa/settings/pages` и выбери **Build and deployment → Source: GitHub Actions**. После этого сайт будет публиковаться автоматически при каждом изменении ветки `main`.

## Сборка EXE
Открой вкладку **Actions** репозитория `SiteKesaa`, выбери **Build Windows installer**, нажми **Run workflow** и дождись завершения. Если сборка успешна, EXE появится в Releases.

## Важно про Android APK
Кнопка APK уже ведёт на релиз `SiteKesaa`, но Android-сборка пока заблокирована ошибкой в исходниках: `mobile/App.js` в `KilluaClicker/KesaMessenger` содержит JSON-конфигурацию вместо компонента React Native. Поэтому я не могу честно обещать, что APK уже готов; его нужно исправить отдельно, прежде чем публиковать APK.
