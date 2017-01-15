This is a client application for a Modernator compatible server, written in
React. See [modernator-haskell](https://github.com/mojotech/modernator-haskell)
for more information.

# Motivation

While I think Modernator is itself a pretty useful and neat application, my
primary purpose for creating this is to experiment and push the boundaries of
how to design a React application. If you're familiar with client-side
Javascript development, you might be familiar with
[TodoMVC](http://todomvc.com). It's a small little application that can be built
from scratch in a few hours to help experiment with client-side frameworks and
libraries. It's very useful, but I've found that it's not complex enough to
accurately weigh what different frameworks bring to the table. With that in mind
I created Modernator. The Modernator specification is intended to be complex
enough such that it requires careful design and forethought during its
implementation on both client and server. However, it's not so complex as to
require a major time investment in understanding and implementing it. A
functioning, complete implementation (without polish and optimization) should be
possible in a few days to a week for reasonably experienced developers. Whereas
something like TodoMVC might be doable in a few hours.

See [Architecture](Architecture.md) for more information about what's specific
to this implementation.

# Building

Before building, you'll want to follow the directions in .env.sample and fill it
in with the appropriate values. Talk to the project maintainer if you don't know
the appropriate values.

## Nix
The easiest way to build this is to download the [Nix package
manager](http://nixos.org/nix/) and use the following commands:

* `nix-shell --pure shell.nix` - Enter a shell environment where all compile and
  run time dependencies are installed and available except for those installed
  via NPM. Use this for active development.
* `npm run build` - Build the minified JS bundle
* `npm run start` - Start the webpack dev server for local testing.

Each of the above commands will automatically download and install all
dependencies required by the project.

I've pinned the application to a specific Nixpkgs version, so anyone building
with Nix should have exactly the same libraries availablie.

### Using the Binary Cache

I've set up a binary cache that can be used to speed up the build time of the
project. If you're on NixOS you can add the following lines to
`/etc/nixos/configuration.nix`:

```
nix.trustedBinaryCaches = [ "http://nix-cache.danielwilsonthomas.com" ];
nix.binaryCachePublicKeys = [ "nix-cache.danielwilsonthomas.com-1:QM4lCC4Z8uywH15CMs0Rt+0EvuqGL1kqxBFritTwIMY=" ];
```

If you already have those keys set up you can add them to the existing list.

If you're just using the Nix package manager, you can add the following to your
`nix.conf` file:

```
trusted-binary-caches = http://nix-cache.danielwilsonthomas.com
binary-cache-public-keys = nix-cache.danielwilsonthomas.com-1:QM4lCC4Z8uywH15CMs0Rt+0EvuqGL1kqxBFritTwIMY=
```

In either case when you run any of `nix-build`, `nix-env --install`, or
`nix-shell` you should pass `--option extra-binary-caches http://nix-cache.danielwilsonthomas.com`

## NPM

The NPM packages aren't currently packaged and managed by Nix, so you'll have to
install them the normal way via `npm install`. `npm start` will start the
Webpack development server. Visit `localhost:3000` to see the application.

# Deployment

The current deployment situation is simply to copy the minified JS bundle onto
an S3 bucket configured to be served as a static site. To deploy, you'll need
the AWS CLI tools. See http://docs.aws.amazon.com/cli/latest/userguide/installing.html or, if you
build this package in a nix-shell, they'll be available there. After that, set
up the CLI tools with appropriate credentials and run `npm run sync`. Talk to
the package maintainer about getting AWS credentials if you don't have them.

# Dependencies

* NodeJS 4.6.0

# Useful Links

* [Modernator-haskell](https://github.com/mojotech/modernator-haskell) This is
  the repository for the haskell reference implementation of Modernator. It
  contains more information about the client. You can run it locally and see the
  Swagger specification at `/ui/` (the trailing forward-slash is required).
