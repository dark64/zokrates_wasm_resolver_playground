import("../pkg/index.js").then(zokrates => {
	window.zokrates = zokrates;


	window.resolve = function resolve_dep(location, path) {
		this.console.log(location + " is resolving dependency '" + path + "'")

		// local storage resolving (proof of concept)
		// user defined code is stored in local storage like shown below

		this.localStorage.setItem("zokrates:dep.code", "import \"dep2\" as dep2\ndef main() -> ():\nreturn")
		this.localStorage.setItem("zokrates:dep2.code", "def main() -> ():\nreturn")

		let key = `zokrates:${path}.code`
		let source = this.localStorage.getItem(key)

		return zokrates.ResolverResult.new(source, path)
	};
});

//zokrates.compile("import \"dep\" as dep\ndef main(field a, field b) -> (field):\nreturn a*b")