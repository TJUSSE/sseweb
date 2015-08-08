# 同济大学软件学院网站

该仓库是软院网站的主站部分。

## Before Contribution

1. 不要将照片放进仓库

2. 不要将密码放进仓库

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
drush dl devel globalredirect rabbit_hole date i18n variable backup_migrate jquery_update fences ctools pathauto token panels ckeditor views term_reference_tree menu_fields zen adminimal_theme adminimal_admin_menu
```

启用插件：

```bash
# cd sseweb
drush en ssetaxonomy globalredirect rh_taxonomy variable backup_migrate jquery_update date_api date date_views fences adminimal_admin_menu ctools page_manager pathauto token panels ckeditor views views_ui term_reference_tree menu_fields -y
```

### Patch

某些插件有兼容性问题，有补丁可以修复但并没有合并到插件代码库中，因此需要手工打补丁。

```bash
# cd sseweb
patch sites/all/modules/term_reference_tree/term_reference_tree.module patches/term_reference_tree.module.patch
patch sites/all/modules/term_reference_tree/term_reference_tree.widget.inc patches/term_reference_tree.widget.inc.patch
```

### 编译 SSE 主题

具体参见 https://github.com/TJUSSE/ssetheme/tree/0.0.2

```bash
cd sites/default/themes/sse
npm install  # 如果安装了 cnpm，则使用 cnpm install
gulp
```

### 导入基础数据库镜像

数据库中包含了设置、菜单项、节点项等信息。该数据库是调试数据库，不包含线上数据。

1. 访问 http://pan.baidu.com/s/1pJpB0yn 下载获得 `2015-08-07T12-13-40.mysql.gz`

2. 访问 http://ssedev.tongji.edu.cn/admin/config/system/backup_migrate/restore ，点击「Restore from an uploaded file」，选择刚才下载下来的 `2015-08-07T12-13-40.mysql.gz`。其中 `http://ssedev.tongji.edu.cn` 是 Drupal 访问路径，请按照自己的配置进行修改。

3. 点击 「Restore Now」

## 提出建议

请在 [issue](https://github.com/TJUSSE/sseweb/issues) 中创建建议。

## 插件说明

- [ssetaxonomy](https://github.com/TJUSSE/ssetaxonomy): 修复 Taxonomy 地址
- [devel](https://www.drupal.org/project/devel): 调试工具
- [date](https://www.drupal.org/project/date): 提供日期时间类型的字段
- [rabbit_hole](https://www.drupal.org/project/rabbit_hole): 控制节点 / Taxonomy 的可访问性 / 重定向
- [globalredirect](https://www.drupal.org/project/globalredirect): `node/xx` 重定向到其 alias 等
- [fences](https://www.drupal.org/project/fences): 为字段提供更简单和更语义化的 HTML 输出
- [pathauto](https://www.drupal.org/project/pathauto): 自动按规则生成 URI alias
- [token](https://www.drupal.org/project/token): 提供 Placeholder 接口
- [panels](https://www.drupal.org/project/panels): 自由布局
- [ckeditor](https://www.drupal.org/project/ckeditor): 富文本编辑
- [views](https://www.drupal.org/project/views): 实现视图，并不需要更多解释
- [term_reference_tree](https://www.drupal.org/project/term_reference_tree): 高级树形词汇表选项
- [menu_fields](https://www.drupal.org/project/menu_fields): 允许菜单项中增加字段
- [adminimal_admin_menu](https://www.drupal.org/project/adminimal_admin_menu): 与 Adminimal 主题配合的后台菜单
- [ctools](https://www.drupal.org/project/ctools): Chaos tool suite，包含 page_manager 等，Panels 所需模块
- [i18n](https://www.drupal.org/project/i18n): 国际化，为内容编写中英文版本
- [variable](https://www.drupal.org/project/variable): I18N 所需模块
- [jquery_update](https://www.drupal.org/project/jquery_update): 更新 jQuery 版本
- [backup_migrate](https://www.drupal.org/project/backup_migrate): 备份迁移工具

## License

MIT