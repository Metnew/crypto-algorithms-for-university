# Basic crypto algorithms

> No npm modules, written from scratch

Tiny CLI program written in Node.js implementing next algorithms:

- Caesar cypher
- Viginere cypher
- "Polybius square"
- XOR algorithm
- Transpose(?) algorithm
- "Pairs" cypher

> Written not for any kind of production usage, only for fun. Implementation may be different from canonical.

## Usage

Install:

``` bash
# Clone repo
$ git clone https://github.com/Metnew/crypto-algos-for-university.git
$ cd crypto-algos-for-university
# link `shifr` bin, no dependencies will be installed.
$ npm i && npm link
```

Caezar:

``` bash
# Encrypt "test/caezar.txt" into "test/caezar.txt.caezar.enc"
$ shifr caezar encrypt test/caezar.txt
# Decrypt "test/caezar.txt.caezar.enc" into "test/caezar.txt.caezar.enc.caezar.dec"
$ shifr caezar decrypt test/caezar.txt.caezar.enc

# NOTE: Usage pattern!
# $ shifr <algorithm> <command> <file>
```

## Known limitations

It's not clear how to handle file paths for decrypted/encrypted files.
The tool appends `$algoName.$command` to processed file.

### Author

Vladimir Metnew <vladimirmetnew@gmail.com>