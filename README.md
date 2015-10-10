# 同济大学软件学院网站

该仓库是软院网站的主站部分。

## Before Contribution

1. 不要将照片放进仓库

2. 不要将密码放进仓库

## 如何从本仓库开始开发

### 1. 安装 drush

```bash
composer global require drush/drush:dev-master -vvv --profile
```

具体参见 http://docs.drush.org/en/master/install/

### 2. 下载 Drupal 7 并 clone 本仓库和子仓库

```bash
drush dl drupal --drupal-project-rename=sseweb
cd sseweb
git init
git remote add origin https://github.com/TJUSSE/sseweb
git fetch origin
/bin/rm .gitignore
git checkout -b master --track origin/master
git submodule update --init --recursive
```

### 3. 下载插件

```bash
# cd sseweb
drush dl \
file_entity title stringoverrides \
node_save_redirect \
ds login_destination \
boost expire \
workbench workbench_moderation \
linkit entityreference \
advanced_help image_url_formatter \
filefield_sources imce menu_force \
imce_mkdir imce_plupload plupload \
conditional_fields field_group link \
module_filter admin_views views_bulk_operations \
ckeditor_blocks-7.x-1.x-dev insert_block \
imagemagick devel globalredirect \
entity_translation i18n variable \
backup_migrate jquery_update ctools \
pathauto token panels ckeditor views \
term_reference_tree menu_fields zen \
adminimal_theme adminimal_admin_menu admin_menu \
entity libraries l10n_update
```

### 4. Patch

某些插件有兼容性问题，或需要增加新功能，需要手工打补丁。

1. 修复 term\_reference\_tree 和 I18N 插件的兼容性问题

  ```bash
  # cd sseweb
  patch sites/all/modules/term_reference_tree/term_reference_tree.module < patches/term_reference_tree.module.patch
  patch sites/all/modules/term_reference_tree/term_reference_tree.widget.inc < patches/term_reference_tree.widget.inc.patch
  ```

2. 为 ImageMagick 插件提供生成渐进式图像的选项。载入此类图像时，会先显示模糊的图片再逐渐变清晰

  ```bash
  # cd sseweb
  patch sites/all/modules/imagemagick/imagemagick_advanced/imagemagick_advanced.install < patches/imagemagick_advanced.install.patch
  patch sites/all/modules/imagemagick/imagemagick_advanced/imagemagick_advanced.module < patches/imagemagick_advanced.module.patch
  ```

3. 修复 Entity API 中翻译检测问题

  ```bash
  # cd sseweb
  patch sites/all/modules/entity/includes/entity.property.inc < patches/entity.property.inc.patch
  ```

### 5. 为 SSE 订阅插件和 SSE 登录插件安装第三方库

具体参见 https://github.com/TJUSSE/sseweb-subscription 和 https://github.com/TJUSSE/sseweb-login

```bash
cd sites/default/modules/sse_subscription
composer install
cd -
```

```bash
cd sites/default/modules/sse_login
composer install
cd -
```

### 6. 编译 SSE 主题

具体参见 https://github.com/TJUSSE/sseweb-theme/tree/0.0.2

```bash
cd sites/default/themes/sse_theme
cnpm install --unsafe-perm
gulp
cd -
# 以下是下载 banner images
cd sites/default/themes/sse_theme/img/banners
wget http://cdug.tongji.edu.cn/sse/banners.tar.gz
tar xzf banners.tar.gz
/bin/rm banners.tar.gz
cd -
```

### 7. 添加自带附件

基础数据库镜像中包含一些附件，如图片等。如果您希望添加，请执行如下命令：

```bash
cd sites/default/files
wget http://cdug.tongji.edu.cn/sse/files.tar.gz
tar xzf files.tar.gz
/bin/rm files.tar.gz
cd -
```

### 8. 初始化网站

1. 在初始化之前，您可能还需要配置 Apache 指向 Drupal 目录，例如：

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

2. 访问相应地址，如 `http://ssedev.tongji.edu.cn`。

3. 选择「软件学院网站」作为 profile 安装。只需要设定数据库链接，并填写初始账户信息即可，其他字段使用默认参数不需要修改。

### 9. 导入基础数据库镜像

数据库中包含了设置、菜单项、节点项等信息。该数据库是调试数据库，不包含线上数据。

1. 访问 http://pan.baidu.com/s/1i3Cizbf 下载最新的数据库快照。

2. 访问 http://ssedev.tongji.edu.cn/admin/config/system/backup_migrate/restore ，点击「Restore from an uploaded file」，选择刚才下载下来的 `.mysql.zip` 快照文件。其中 `http://ssedev.tongji.edu.cn` 是 Drupal 访问路径，请按照自己的配置进行修改。

3. 点击 「Restore Now」。

### 10. 配置 ImageMagick

网站使用了 ImageMagick 来处理上传的图片。

请在本地安装 ImageMagick 二进制，然后访问 `/admin/config/media/image-toolkit` 地址配置路径。

## 邮件订阅

如果需要使用邮件订阅，请参考 https://github.com/TJUSSE/sseweb-subscription

## 教师账户登录

如果需要使用同济大学统一认证登录，请参考 https://github.com/TJUSSE/sseweb-login

## 提出建议

请在 [issue](https://github.com/TJUSSE/sseweb/issues) 中创建建议。

## Troubleshooting

1. 安装完 Drupal 后出现错误 `Notice: Undefined index: name in block_menu()`：
  
  一般是因为 `sites/default/themes/sse_theme/node_modules` 下的 `.info` 文件没有删除

## 插件说明

- [admin\_views](https://www.drupal.org/project/admin_views): 提供更好的管理界面
- [adminimal\_admin\_menu](https://www.drupal.org/project/adminimal_admin_menu): 与 Adminimal 主题配合的后台菜单
- [advanced\_help](https://www.drupal.org/project/advanced_help): 更好的帮助信息
- [backup\_migrate](https://www.drupal.org/project/backup_migrate): 备份迁移工具
- [boost](https://www.drupal.org/project/boost): Drupal 静态缓存
- [ckeditor](https://www.drupal.org/project/ckeditor): 富文本编辑
- [ckeditor\_blocks](https://www.drupal.org/project/ckeditor_blocks): 在编辑器中可以选择 block 插入
- [conditional\_fields](https://www.drupal.org/project/conditional_fields): 条件字段
- [date](https://www.drupal.org/project/date): 提供日期时间类型的字段
- [devel](https://www.drupal.org/project/devel): 调试工具
- [ds](https://www.drupal.org/project/ds): 控制字段显示
- [entityreference](https://www.drupal.org/project/entityreference): 可引用的字段
- [entity\_translation](https://www.drupal.org/project/entity_translation): 翻译实体
- [expire](https://www.drupal.org/project/expire): 自动过期缓存
- [field\_group](https://www.drupal.org/project/field_group): 对字段分组
- [file\_entity](https://www.drupal.org/project/file_entity): File as entities
- [filefield\_sources](https://www.drupal.com/project/filefield_sources): 集成 IMCE 到内置字段
- [globalredirect](https://www.drupal.org/project/globalredirect): `node/xx` 重定向到其 alias 等
- [i18n](https://www.drupal.org/project/i18n): 国际化，为内容编写中英文版本
- [imagemagick](https://www.drupal.org/project/imagemagick): 使用 imagemagick 处理图片
- [image\_url\_formatter](https://www.drupal.org/project/image_url_formatter): 提供图像链接格式化器
- [imce](https://www.drupal.com/project/imce): 文件和图片管理
- [jquery\_update](https://www.drupal.org/project/jquery_update): 更新 jQuery 版本
- [link](https://www.drupal.org/project/link): 超链接字段
- [linkit](https://www.drupal.org/project/linkit): 选择内部或外部链接
- [login_destination](https://www.drupal.org/project/login_destination): 登录跳转
- [menu\_fields](https://www.drupal.org/project/menu_fields): 允许菜单项中增加字段
- [menu\_force](https://www.drupal.org/project/menu_force): 强制勾选「使用菜单」
- [module\_filter](https://www.drupal.org/project/module_filter): 在模块页面提供筛选功能
- [node\_save\_redirect](https://www.drupal.org/project/node_save_redirect): 保存节点重定向
- [panels](https://www.drupal.org/project/panels): 自由布局
- [pathauto](https://www.drupal.org/project/pathauto): 自动按规则生成 URI alias
- [rabbit\_hole](https://www.drupal.org/project/rabbit_hole): 控制节点 / Taxonomy 的可访问性 / 重定向
- [sseadmintype](https://github.com/TJUSSE/sseweb-admin-type): 为各个节点类型显示管理菜单
- [ssecontactfield](https://github.com/TJUSSE/sseweb-contactfield): 联系方式字段
- [ssemark](https://github.com/TJUSSE/sseweb-mark): 在编辑器中添加高亮内容按钮
- [ssetaxonomy](https://github.com/TJUSSE/sseweb-fixtaxonomy): 修复 Taxonomy 地址
- [term\_reference\_tree](https://www.drupal.org/project/term_reference_tree): 高级树形词汇表选项
- [token](https://www.drupal.org/project/token): 提供 Placeholder 接口
- [views](https://www.drupal.org/project/views): Views
- [workbench](https://www.drupal.org/project/workbench): 草稿审核等

## License

MIT