# Lambda

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


目录结构介绍：

* /dist                     由打包任务生成

* /node_modules
* /src
  *  /css                   样式，支持 css 和 less
  * /common             公用样式
  * /lib                引入外部样式
  * /page               每个页面对应的样式
  *  /img                       图片资源
  * /js
    * /components           组件脚本，不会被搜索引擎搜索到！页面加载时生成的
    * /component    单个组件名
        * /css      此组件的样式
        * / /img        此组件所用图片资源
        * / tmpl        此组件所用html
        * / index.js    组件入口
    * /page             每个页面使用的 js 入口
 * /view                    每个页面的

view 下面的

 * layout 是渲染网页的外壳，如有别的需要可以定制不一样的layout.使用时在具体页面的js里面引入

 * pages 是每个页面的 html 生成引擎，通常用同名的两个 js 和 ejs 组成，js里面可以传入 ejs模板需要的变量等

 * partial 则是所有页面共同需要引入的 html 片段


#版本控制规则


分支管理

* 开始新版本迭代：根据迭代计划从 master 分支上创建新的开发分支进行
* 开始新功能开发：在开发分支上创建新功能分支进行
* 完成新功能开发：将功能分支基于开发分支进行 rebase，同时删除跟此功能远程分支，重新 push 远程分支做 code review，通过后合并到开发分支
* 完成新版本迭代：根据开发里程碑将开发分支通过 git rebase 并合并到 master 同时删除开发分支
* BUG 修复：在 master 创建新分支进行修改，之后合并回 master 并根据需要合并到开发分支和历史版本



push / pull

* 更新代码时尽量使用 git pull --rebase 保持在fast-forward状态下解决冲突
* 已经进行完rebase的本地分支，应立即将对应的远程分支删除 git push origin :feature/JIRA
