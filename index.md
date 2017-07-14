#### 利用react-redux-tpl快速开发react-redux-webpack项目

个人学习使用react已经有一段时间了，虽然没有在真正的产品项目中大规模使用react，但是在自己的博客、小网站、一些开源项目中已经使用过好几次了，使用react创建项目个人也有了一些心得并且经过尝试验证，总结了这个可以用于起步的框架模版[react-redux-tpl](https://github.com/aircloud/react-redux-tpl)。

将它开源出来，希望能给某些同学带来帮助，如果有设计的不好的地方，也希望能及时指出，共同进步。

#### 宏观解读

在现在，我们其实有很多脚手架可以使用，例如create-react-app就是业界比较优秀的应用开发工具之一，笔者也使用过，但是我的感觉是由于它已经将所有的工具集成好了，可控性反而不那么强，有些内容也不一定会了解的很透彻，但是自己从0开始配置呢，又会比较麻烦，每次从新开一个项目又需要做很多前置工作，比较麻烦。

react-redux-tpl这个模版就是为了解决这个问题，它基于Express，集成了ES6、react、redux(以及redux-dev-tool)、react-router、webpack热更新，并且按照一定的规则和最佳实践进行文件组织和代码组织，可以使开发人员几乎无需写一行配置代码就可以直接开发业务。

现在它的使用方式是这样的：

```
npm install react-redux-tpl -g
react-redux-tpl FileName
cd FileName
npm install
npm run start
```

之后再chrome中打开`localhost:7777`即可看到效果(注：如果网速较慢，特别是在使用教育网的情况下，执行第二个命令之后可能要稍微等几分钟)。

或者你也可以直接`git clone https://github.com/aircloud/react-redux-tpl`将整个模版项目下载下来，到这个文件夹里：

```
npm install
npm run start
```

同样可以达到效果

#### 文件组织

我认为，一个一百个文件以上的项目，最重要的事情就是文件组织，文件组织对开发效率、维护效率、多人协作甚至代码重用，都有很重要的意义，而现在随着组件化开发的流行和更精确的粒度控制，我们的文件很容易变得非常多。

我在文件组织方式是这样的，这里面主要列出重点目录并着重突出一下前端文件:

```
-bin
-common //react核心文件目录
 |- actions
 |- components
 	|- Common
 	|- HomePage
 	|- SubPage
 	......
 |- containers
 |- enter
 |- reducers
 |- routes
 |- store
 |- Utils
-controller
-public //静态资源目录
 |- images
 |- javascripts
 index.html
-routes
-views
app.js
webpack.config.js
...... 
```

这里面首先说一下目录命名规则，目录出了最末端只有jsx的文件目录采用大驼峰命名规则，并且和里面的首要jsx文件同名之外，一律采用小写，并且尽量控制不出现复合单词。

react核心文件目录之所以命名common，是因为考虑到如果使用服务端渲染，这便相当于一个公共资源目录，服务端渲染我们可以考虑在routes目录下的路由层进行配置(该模版框架没有采用服务端渲染，需要自行配置，但比较简单)。

common下的actions、reducers、store都是和redux有关的文件目录，enter为入口目录，enter目录下的文件通常为webpack配置时候的入口文件。

containers和components为组件，containers下的文件一般为直接配合路由使用的包装组件，components为具体业务组件，这个地方有的规范将组件分为三层，我个人认为这个必要性不大。

另外，除了一些公共样式需要放在公共文件，我建议每一个组件搭配一个同名样式文件:

```
-HomePage.js
-HomePage.less
```

这样控制起来会比较方便，另外我们可以尝试采用css-modules，个人认为虽然解决了class冲突问题，但是却不利于代码调试，而且也有一定迁移成本，故不用。

#### Webpack配置

关于webpack配置优化的问题，网上的教程和博客都非常的多，我在react-redux-tpl进行了一部分优化配置，并且利用了express的插件进行了热更新的配置。考虑到模版框架的通用和简洁性，并且考虑到编译速度优化的选择多样性，我在这里简化了配置。

如果对编译时间要求比较高的话，仅仅做这些是不管用的，我们应当进行更多的性能优化。关于webpack性能调优，我在[这里](https://github.com/aircloud/BookReadNote/tree/master/webpackLearning)总结了一些内容，可以进行尝试。

另外这里面值得一提的是使用的[**webpack-hash-sync**](https://github.com/aircloud/webpack-hash-sync)这个插件，关于引用的js文件名同步的问题，虽然已经有html-webpack-plugin这个插件，但是我认为它是不符合我的编程习惯的，它是通过我们的配置，直接生成html文件，而实际上我们的html文件都是通常先写好，并且做很多个性化配置内容，方便又简洁，直接使用html-webpack-plugin很多时候是无法做到的。

而使用**webpack-hash-sync**我们可以给定正则表达式，每次webpack的时候都会一个一个的去匹配正则表达式并且把hash值或者chunkhash进行改变：

```
new WebpackHashSync({
            file:["output.*?js","common.*?js"],
            path:path.join(__dirname, 'public/'),
            html:["index.html"],
            hash:true,
            chunkhash:false
}),
```

#### 使用redux

项目中引入了`redux-devtools`这个调试功能插件(可关闭，最简单的办法就是不在`common/enter/index.js`中引入了)，并且默认引入[redux-thunk](https://github.com/gaearon/redux-thunk)和[react-router-redux](https://github.com/reactjs/react-router-redux)这两个中间件，前者是可以直接在action中发异步请求，后者是可以增强一些react-router的功能。

我建议大家可以看看他们的GitHub主页，讲的都挺不错的，特别是前者，十来行代码的一个插件，近5000个star，不得不说，是牛逼。

在`common/actions/index.action.js`里，我写了一些示例的同步的和异步的action，大家可以参考这个写法，直接上手。

另外，我关于一个redux的使用原则是：

* 只有被共享数据才会被用在redux中，组件的非共享数据(比如一些展示列表)，不要放在redux中，而是随着组件生命周期被请求、构造、消失... 

#### react组件

写react的项目，最重要最耗时的，还是react组件开发，我关于组件粒度划分的几个原则如下(当然这在这个模版框架中可能没有体现出来)：

* 如果列表中的元素存在动态交互，便尽可能地将元素做成一个独立的组件。
* 为了提高效率和保持整站用户体验的统一，我们尽可能复用低级组件，比如定制的按钮、列表、标签等，并且都统一放在Common文件夹下。

在react组件开发中，我一般是给每一个模块(或者一个页面)一个文件夹，比如HomePage，这个文件夹下只有HomePage.js是需要被别的目录下文件引入的，而HomePage需要的一些公共组件在Common目录下，私有组件在HomePage本文件目录下。

另外，我们可以在HomePage.js中利用ES7中的装饰者模式配置react-redux：

```
@connect(state => {
    return {
        Info:state.rootReducer.getInfo.info
    };
}, {
    getAllClass,updateInfo
})
class HomePage extends Component{
 //...
}
```
其他的子组件的数据通过props传入(当然，如果是子组件的私有数据，还是在子组件内自行处理)

#### 总结

以上是我梳理的关于构建这个模版框架的一些思考，由于某些内容还未深思熟虑，因此目前没有写入，我也会在接下来的一段时间内，继续打磨这个内容，争取整理出一套还不错的实践。

如果有些许认同，欢迎给[star鼓励](https://github.com/aircloud/react-redux-tpl)。

如果有bug或者设计不好的地方，请在[这里](https://github.com/aircloud/react-redux-tpl/issues)提出，我会在24小时之内回复并且尝试解决问题。


[注1]本文中提到的一些对比的例子，都是个人角度的一些片面见解和个人习惯问题，实际上我个人还是认为这些项目十分优秀的，成熟度也比较高，向前辈致敬。


