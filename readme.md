### react-redux-tpl

  <a href="https://www.npmjs.com/package/react-redux-tpl"><img src="https://img.shields.io/npm/v/react-redux-tpl.svg" alt="Version"></a>
  <a href="https://github.com/aircloud/react-redux-tpl/archive/master.zip"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>


The English document is [there](https://github.com/aircloud/react-redux-tpl/blob/master/readme.md)

### react-redux-tpl 简介

这是一个弱主张的模版框架。

之所以称之为**模版框架**，是因为它是直接基于react和express的，并在此基础上，提供了一个比较通用的写法，并且给出样例，在快速开发一个小项目的时候，可以提高效率。

实际上，我们在开发管理系统、学校作业、一些团队的小工具的时候，时间都是比较有限，每次都从0开始组织文件会给自己带来非常多并且冗余的工作量，这个时候我们如果用这个模版框架的写法，可以保证非常快的进入真正的业务开发(而不是学习语法、组织文件、书写webpack等)，从而提高整体效率。

之所以称之为**弱主张**，是因为文件里的所有写法都是推荐写法但是并不强制，采用这种推荐写法可以快速流畅的运行项目，但是在这个基础上自己做大幅度的改动也是完全没有问题。模版框架本身是为了提高效率，不是为了灌输思想。

当然，做什么样的事情用什么样的工具，如果项目本身不是特别复杂(200个文件以内)，我建议可以采用本框架，如果项目比较复杂，我建议团队应该自行深度约定，或者寻求更为复杂的解决方案。

### 使用说明

建议采用npm的方式进行全局安装:

```
npm install react-redux-tpl -g
```

然后可以采用下面的方式初始化一个项目(FileName为自己项目的文件名):

```
react-redux-tpl FileName
```
进入项目文件:

```
cd FileName
```
首先运行如下命令(如下过程已经包含`npm install`，因此不用重复执行)

```
npm run init
```
然后可以通过如下命令启动项目：

```
npm run start
```

### 文件介绍

正在完善
