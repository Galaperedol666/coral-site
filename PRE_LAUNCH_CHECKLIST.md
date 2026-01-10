# Корал - Сайт меблів

## Перед публікацією на GitHub + на сервер:

### 1. **Замініть всі `yourdomain.com` на реальний домен**
   - `index.html` - schema.org
   - `sitemap.xml` - усі URL адреси
   - `robots.txt` - sitemap URL

### 2. **Додайте в `.gitignore`** (якщо ще немає)
   ```
   node_modules/
   .DS_Store
   .env
   *.log
   ```

### 3. **Структура файлів готова до публікації**
   - ✓ HTML валідація
   - ✓ SEO: мета теги, описи, ключові слова
   - ✓ Schema.org структуровані дані для пошукових систем
   - ✓ Open Graph теги (потребують домену)
   - ✓ robots.txt і sitemap.xml
   - ✓ Alt текст для всіх зображень (доступність)
   - ✓ Aria атрибути для скрін-рідерів
   - ✓ Favicon посилання правильне

### 4. **SEO оптимізація**
   - Мета описи на кожній сторінці
   - Ключові слова включені
   - Структуровані дані JSON-LD
   - Sitemap для Google Search Console

### 5. **Перед пушем на GitHub**
   ```bash
   git add .
   git commit -m "chore: initial commit - website ready for production"
   git push origin main
   ```

### 6. **Після публікації на сервер**
   - Додайте домен в `sitemap.xml`
   - Додайте домен в `robots.txt`
   - Зареєструйте sitemap.xml в Google Search Console
   - Зареєструйте домен в Yandex Webmaster

---
**Дата перевірки:** 10 січня 2026
