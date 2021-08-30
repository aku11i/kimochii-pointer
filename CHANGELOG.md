# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.3](https://github.com/aku11i/kimochii-pointer/compare/v0.7.2...v0.7.3) (2021-08-30)


### Features

* ポインターのデフォルトサイズを小さくする ([#34](https://github.com/aku11i/kimochii-pointer/issues/34)) ([f09f47e](https://github.com/aku11i/kimochii-pointer/commit/f09f47e2d8438a9a408393ec706daeacc3164eb9))

### [0.7.2](https://github.com/aku11i/kimochii-pointer/compare/v0.7.1...v0.7.2) (2021-08-30)


### Bug Fixes

* ポインター座標の更新タイミングを調整 ([#33](https://github.com/aku11i/kimochii-pointer/issues/33)) ([15a1513](https://github.com/aku11i/kimochii-pointer/commit/15a151326658f1b9ddf2644035520032e45148ef))

### [0.7.1](https://github.com/aku11i/kimochii-pointer/compare/v0.7.0...v0.7.1) (2021-08-30)


### Features

* Add easing to transitions ([#32](https://github.com/aku11i/kimochii-pointer/issues/32)) ([8ea8c59](https://github.com/aku11i/kimochii-pointer/commit/8ea8c5973b0c7e30d48d5bab5b42fc14be3cc45a))

## [0.7.0](https://github.com/aku11i/kimochii-pointer/compare/v0.6.2...v0.7.0) (2021-08-30)


### ⚠ BREAKING CHANGES

* Shapeの型定義を変更 (#28)

### Features

* Add shape that increases transparency ([#29](https://github.com/aku11i/kimochii-pointer/issues/29)) ([eea19c5](https://github.com/aku11i/kimochii-pointer/commit/eea19c56e607fb99ea02edcbeeb353244193fcb7))
* Adjust transition duration of default shapes ([#31](https://github.com/aku11i/kimochii-pointer/issues/31)) ([bbe3dfa](https://github.com/aku11i/kimochii-pointer/commit/bbe3dfa43601248a232fb6f7115e0ffa7ffe5276))
* 内臓Shapeの型をexportする ([#30](https://github.com/aku11i/kimochii-pointer/issues/30)) ([8b412d7](https://github.com/aku11i/kimochii-pointer/commit/8b412d7e2d569bd108ba710b2280232f2505170e))


* Shapeの型定義を変更 ([#28](https://github.com/aku11i/kimochii-pointer/issues/28)) ([8351d20](https://github.com/aku11i/kimochii-pointer/commit/8351d2067ecc40450bdd2700afeeb19fa380bb21))

### [0.6.2](https://github.com/aku11i/kimochii-pointer/compare/v0.6.1...v0.6.2) (2021-08-28)


### Features

* アニメーションを滑らかにする ([#25](https://github.com/aku11i/kimochii-pointer/issues/25)) ([fbe8bef](https://github.com/aku11i/kimochii-pointer/commit/fbe8befdc25382cc9ca836e700d44edd3aafc150))

### [0.6.1](https://github.com/aku11i/kimochii-pointer/compare/v0.6.0...v0.6.1) (2021-08-28)


### Bug Fixes

* testShapeの視認性を向上させる ([#22](https://github.com/aku11i/kimochii-pointer/issues/22)) ([c5145b5](https://github.com/aku11i/kimochii-pointer/commit/c5145b5a510a8124e5d0bc8cdeac8a3870466285))

## [0.6.0](https://github.com/aku11i/kimochii-pointer/compare/v0.5.1...v0.6.0) (2021-08-28)


### ⚠ BREAKING CHANGES

* Rename "shapeFactory" to "createShapeFactory" (#20)

* Rename "shapeFactory" to "createShapeFactory" ([#20](https://github.com/aku11i/kimochii-pointer/issues/20)) ([4186fea](https://github.com/aku11i/kimochii-pointer/commit/4186fea34ecfd7a694369e2bd63321a6fd9f370f))

### [0.5.1](https://github.com/aku11i/kimochii-pointer/compare/v0.5.0...v0.5.1) (2021-08-27)


### Features

* クリック中はopacityを上げる ([#19](https://github.com/aku11i/kimochii-pointer/issues/19)) ([62f0694](https://github.com/aku11i/kimochii-pointer/commit/62f069456bcc73c3357e81f119dfcd1bc4b22ca5))

## [0.5.0](https://github.com/aku11i/kimochii-pointer/compare/v0.4.1...v0.5.0) (2021-08-27)


### ⚠ BREAKING CHANGES

* Remove outline shape (#18)

### Bug Fixes

* Remove outline shape ([#18](https://github.com/aku11i/kimochii-pointer/issues/18)) ([a7ca42b](https://github.com/aku11i/kimochii-pointer/commit/a7ca42b2c662f4206889fcfa60ce6ca068224915))

### [0.4.1](https://github.com/aku11i/kimochii-pointer/compare/v0.4.0...v0.4.1) (2021-08-27)


### Features

* Add shape "outline" ([#17](https://github.com/aku11i/kimochii-pointer/issues/17)) ([3de8ab5](https://github.com/aku11i/kimochii-pointer/commit/3de8ab5a43e3fbd8a7d2e14c013e326daa7924fe))

## [0.4.0](https://github.com/aku11i/kimochii-pointer/compare/v0.3.0...v0.4.0) (2021-08-27)


### ⚠ BREAKING CHANGES

* Shape.cancelMouseMove -> Shape.fixPosition (#16)
* Remove "useShape" / Add "getShape" "applyShape" (#14)

### Features

* テキスト用のShapeを追加 ([#15](https://github.com/aku11i/kimochii-pointer/issues/15)) ([026b736](https://github.com/aku11i/kimochii-pointer/commit/026b73618db80ea8cb766d988d14ff87e38bdeb9))


* Remove "useShape" / Add "getShape" "applyShape" ([#14](https://github.com/aku11i/kimochii-pointer/issues/14)) ([d810d6e](https://github.com/aku11i/kimochii-pointer/commit/d810d6ead7fc33604d96d0cc71364e3782eebea5))
* Shape.cancelMouseMove -> Shape.fixPosition ([#16](https://github.com/aku11i/kimochii-pointer/issues/16)) ([dfac25a](https://github.com/aku11i/kimochii-pointer/commit/dfac25a5fff0c845b539a052d225c59699b3eabb))

## [0.3.0](https://github.com/aku11i/kimochii-pointer/compare/v0.1.3...v0.3.0) (2021-08-27)


### ⚠ BREAKING CHANGES

* メソッド名変更 set -> apply (#13)
* 変形処理を別ファイルに分ける / オプションの構造を変更 (#12)
* モード変更のメソッド名を変更 (#10)

### Features

* setメソッドを追加 ([#11](https://github.com/aku11i/kimochii-pointer/issues/11)) ([d7801cd](https://github.com/aku11i/kimochii-pointer/commit/d7801cd0973528389b7b43c49808ad802627d65a))


### Bug Fixes

* typo ([eed4150](https://github.com/aku11i/kimochii-pointer/commit/eed41505e1e6b662e955d4bfc1dc9dd86bd12dbc))


* メソッド名変更 set -> apply ([#13](https://github.com/aku11i/kimochii-pointer/issues/13)) ([7cc0e3f](https://github.com/aku11i/kimochii-pointer/commit/7cc0e3f53850ed6957330d064e32d92b03b7a4a6))
* モード変更のメソッド名を変更 ([#10](https://github.com/aku11i/kimochii-pointer/issues/10)) ([56cceed](https://github.com/aku11i/kimochii-pointer/commit/56cceed1f1c84263c7047c6990b73f4614eb74dd))
* 変形処理を別ファイルに分ける / オプションの構造を変更 ([#12](https://github.com/aku11i/kimochii-pointer/issues/12)) ([abfc458](https://github.com/aku11i/kimochii-pointer/commit/abfc458223e91f04bf7a265395deaf06fa06bc4d))

## [0.2.0](https://github.com/aku11i/kimochii-pointer/compare/v0.1.3...v0.2.0) (2021-08-27)
