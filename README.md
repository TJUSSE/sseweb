# 同济大学软件学院网站

该仓库是软院网站的主站部分。

## 如何从本仓库开始开发

### 安装 drush

```bash
composer global require drush/drush:dev-master -vvv --profile
```

具体参见 http://docs.drush.org/en/master/install/

### 下载 drupal 并 clone 本仓库

```bash
drush dl drupal --drupal-project-rename=sseweb
cd sseweb
git init
git remote add origin https://github.com/TJUSSE/sseweb
git fetch origin
rm .gitignore
git checkout -b master --track origin/master
git submodule update --init --recursive
```

您还需要配置 Apache 指向 Drupal 目录，例如：

```apache
<VirtualHost *:80>
        DocumentRoot /Users/Breezewish/Development/SSEWeb/sseweb
        ServerName ssedev.tongji.edu.cn
</VirtualHost>

<Directory "/Users/Breezewish/Development/SSEWeb/sseweb">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

### 初始化

访问相应地址，如 `http://ssedev.tongji.edu.cn`。以默认英文初始化即可。

### 配置插件和管理主题

下载：

```bash
# cd sseweb
drush dl ctools pathauto token panels ckeditor views term_reference_tree zen adminimal_theme-7.x-1.x-dev adminimal_admin_menu
```

启用插件：

```bash
# cd sseweb
drush en adminimal_admin_menu ctools page_manager pathauto token panels ckeditor views views_ui term_reference_tree -y
drush dis comment toolbar -y
```

启用后台主题：

```bash
# cd sseweb
drush en adminimal -y
drush vset admin_theme adminimal
```

### TongjiSSE 主题

```bash
# cd sseweb
drush en sse -y
drush vset theme_default sse
```

## 提出建议

请在 [issue](https://github.com/TJUSSE/sseweb/issues) 中创建建议。

## License

MIT