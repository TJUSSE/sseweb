/**
 * @file 允许对内容添加荧光笔高亮
 */
/*global CKEDITOR */
CKEDITOR.plugins.add('mark', {
  icons: 'mark',
  init: function (editor) {
    var style = new CKEDITOR.style({element: 'mark'}), forms = ['mark'];
    forms.unshift(style);

    editor.attachStyleStateChange(style, function (state) {
      if (!editor.readOnly) {
        editor.getCommand('mark').setState(state);
      }
    });

    editor.addCommand('mark', new CKEDITOR.styleCommand(style, {contentForms: forms}));

    if (editor.ui.addButton) {
      editor.ui.addButton('mark', {
        label: '高亮标记',
        command: 'mark',
        icon: this.path + 'icons/mark.png',
        toolbar: 'basicstyles,100'
      });
    }
  }
});
