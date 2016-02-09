'use strict'

const co = require('co')
const generators = require('yeoman-generator')
const globby = require('globby')
const path = require('path')

module.exports = generators.Base.extend({
	prompting() {
		const done = this.async()
		this.prompt([ {
			type: 'input',
			name: 'package',
			message: 'Your package name',
			default: this.appname,
		}, {
			type: 'input',
			name: 'groupId',
			message: 'Maven group-ID',
			default: this.appname,
		}, {
			type: 'input',
			name: 'artifactId',
			message: 'Maven artifact-ID',
			default: this.appname,
		} ], (answers) => {
			this._answers = answers
			done()
		})
	},

	writing: co(function * () {
		const done = this.async()

		if (!/^(\w+\.)*\w+$/.test(this._answers.package))
			throw new Error('Invalid package name: ' + this._answers.package)

		const pkgDir = path.join(this.destinationPath(), 'src/main/java', this._answers.package.replace(/\./g, '/'))

		const globs = [ '**/*.*', '**/.*' ].map(part => path.join(this.templatePath(), part)).concat([ '!**/*.java' ])
		const files = yield globby(globs)
		for (const f of files)
			this.fs.copyTpl(f, this.destinationPath(path.relative(this.templatePath(), f)), this._answers)

		this.fs.copyTpl(path.join(this.templatePath(), 'src/main/java/HomeController.java'), path.join(pkgDir, 'HelloController.java'), this._answers)

		done()
	}),
})
