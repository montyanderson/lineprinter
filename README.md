# lineprinter

Print to USB line printers from Node

![](https://i.imgur.com/D7FIJaS.jpg)

## Usage

``` javascript
const LinePrinter = require("lineprinter");
const printer = await LinePrinter.auto();

await printer.println("Hello, World!");
```

### API

#### async LinePrinter.list()

Returns the list of printers currently connected.

``` javascript
await LinePrinter.list();
// [ "lp0" ]
```

#### async LinePrinter.connect(device)

Returns a new `LinePrinter` connected to the printer.

``` javascript
const printer = await LinePrinter.connect("lp0");
```

#### async LinePrinter.auto()

Returns a `LinePrinter` connected to the first printer found.

``` javascript
const printer = await LinePrinter.auto();
```

#### async LinePrinter#print(data)

Prints `data` to the printer. Can be a `String` or `Buffer`.

``` javascript
await printer.print("Hello");
```

#### async LinePrinter#println(data)

Prints `data` to the printer, followed by a line break.


``` javascript
await printer.println("Hello, World!");
```
