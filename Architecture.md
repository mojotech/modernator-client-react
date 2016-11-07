# Architecture of a Client Application for Modernator, in React

## Fundamental Ideals

This implementation is focused on a functional programming ideal. That is, I'm
intentionally eschewing some of the more orthodox OOP techniques used in
Javascript in favor of FP techniques. This is primarily a personal decision. I
think FP is going to supplant OOP as the primary method of abstraction in the
future, and I'd like to provide many learning opportunities to work with and get
familiar with those techniques as part of this application.

With that in mind, you'll notice heavy use of functions everywhere. The
libraries in use have also been chosen with FP in mind.

TODO: Expand this section with some more concrete guidelines.

## Fundamental libraries

### React

React was chosen for its efficient, speed, popularity, and philosophy similar to
functional programming. In this implementation I'm attempting to use primarily
stateless function components. However, you will also see some higher-order
components used to encapsulate stateful behavior or lifecycle behavior. See
[OnInitialize](src/components/on-initialize.jsx) and
[StatefulForm](src/components/stateful-form.jsx) for examples of these. The
ideal state is for all components related to the application domain to be
written as stateless function components, with the higher-order components
providing cross-cutting concerns such as initialization or form input handling.

### Redux

The application is complicated enough to warrant a dedicated solution for
managing state. Redux was a natural fit for that solution, although
[Cycle](https://cycle.js.org) and [MobX](https://mobxjs.github.io/mobx/) can
fulfill similar roles. This implementation also makes use of the
[Ducks](https://github.com/erikras/ducks-modular-redux) organizational pattern
for organizing reducers and actions. This has led to a stronger encapsulation
and separation of concerns in the reducers. Additionally I'm using the
[redux-side-effect](https://github.com/gregwebs/redux-side-effect) middleware
for handling effectful actions. It's slotted very nicely into the Ducks pattern
and, while I was skeptical of having impure reducers, I'm very pleased with how
it's turned out.

### [Ramda](http://ramdajs.com/)

Ramda is a library similar to [Lodash](https://lodash.com/) or
[Underscore](http://underscorejs.org/). It provides a standard library of sorts
full of helpful utility functions. Unlike Lodash or Underscore, Ramda provides
this standard library optimized for many functional programming practices.
You'll see many usages of `curry` and `compose` in this implementation, which
are relatively rare when using Lodash or Underscore. Ramda's primary benefit is
aids in functional decomposition; it helps me decompose problems into small,
single-purpose pieces.

## Design Decisions

### Websockets

This implementation makes use of Websockets to optimize the fetching and
updating of Q&A Session information. Other implementations may opt to repeatedly
poll for new Session information. All of the Websocket related code is in
[src/reducers/session/index.js](src/reducers/session/index.js).

### ~~[Flow](https://flowtype.org)~~

I was initially excited to use Flow to add an extra layer of static analysis in
the form of type checking. However, while using it I ran into an issue that
prevented Flow from catching errors that it should have. Until those are fixed,
Flow isn't worth the effort. You will still find several files in the
[types](src/types/) directory. These handle common constants and named React
PropType definitions.

### [Immutable](https://facebook.github.io/immutable-js/)

I'm not currently making use of a dedicated solution for Immutable updates in
favor of handling immutable updates myself. It is worth looking into in the
future, as it enables some nice performance and safety benefits.
