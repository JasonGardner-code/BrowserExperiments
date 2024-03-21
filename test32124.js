{
  function instantiateJsc(filename, importObject) {
    let bytes = read(filename, 'binary');
    return WebAssembly.instantiate(bytes, importObject, 'x');
  }
  const log = debug;
  const report = $.agent.report;
  const isJIT = callerIsBBQOrOMGCompiled;
  tools = {log, report, isJIT, instantiate: instantiateJsc};
}
const {log, report, isJIT, instantiate} = tools;
const extra = {isJIT};
(async function () {
  let memory0 = new WebAssembly.Memory({initial: 3510, shared: false, maximum: 4275});
  let fn0 = function () {};
  let fn1 = function () {};
  let fn2 = function () {};
  let tag2 = new WebAssembly.Tag({parameters: []});
  let tag8 = new WebAssembly.Tag({parameters: []});
  let global0 = new WebAssembly.Global({value: 'anyfunc', mutable: true}, null);
  let global1 = new WebAssembly.Global({value: 'i64', mutable: true}, 2687521653n);
  let global2 = new WebAssembly.Global({value: 'i64', mutable: true}, 3499115411n);
  let global3 = new WebAssembly.Global({value: 'f64', mutable: true}, 46546.77541190513);
  let global4 = new WebAssembly.Global({value: 'i32', mutable: true}, 3310225489);
  let global5 = new WebAssembly.Global({value: 'i64', mutable: true}, 291230721n);
  let global7 = new WebAssembly.Global({value: 'i64', mutable: true}, 2617080151n);
  let global8 = new WebAssembly.Global({value: 'anyfunc', mutable: true}, global0.value);
  let m2 = {fn1, fn2, global0, memory0, tag3: tag2, tag4: tag2, tag6: tag2};
  let m0 = {fn0, global1, global3, global4, global6: global3, tag2, tag7: tag2, tag10: tag2};
  let m