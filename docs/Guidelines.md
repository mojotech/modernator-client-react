# Guiding Principles for this Project

In the interest of finding the breaking points of different patterns and
principles, I've laid out a set of guiding principles for this project.

## No `getState`

I'm not using redux-thunk, so this is already taken care of. However I'd like to
elaborate on why this is here. Usage of `getState` indicates a couple of
deficiencies in a larger architecture. Primarily, it indicates that it was more
convenient to couple your function to a constantly changing global variable than
it was to pass those dependencies as parameters. This comes about through poor
state and component architecture, where data isn't in the form or locations that
are required. In general, `getState` and functionality like it should be
avoided, and if it seems like the correct path double check and see if there
aren't any other approaches that make the whole system better.

## Stateless Function Components

I'm interested in seeing just how far stateless function components can be
pushed. To that end I've decided that as many components as possible will be
written as such. All of the domain components are stateless function components.
They are sometimes augmented with higher-order components in order to
selectively access parts of the React component lifecycle. These use more
traditional class components.

## Component Props

This project enforces a system such that a component's props are either *all*
passed in at instantiation time, or *none* of them are passed in. That is,
components will always be either `<DontPassProps />`, or `<PassAllProps
propA='foo' propB=3 />`. They should never get props from different sources.
This is primarily a choice of simplicity. You will never have to guess at which
props you need to fill in and which you need to leave alone, because you will
either fill all of them in or none of them.

## Components, Actions, State, and the Language of your Domain

When designing components, actions, and state, think hard about what they are
saying about your domain. Think of your state as the bones of your domain. They
are the foundation. They need to be solid, with minimal waste but still
directing how everything else is built up around them. The actions are the
muscles of your domain. They create relationships between different parts of
your state just like muscles connect bones together. You want the actions to be
flexible enough to allow you to perform all the tasks necessary, but again you
don't want more actions than necessary, because those extra actions will pull
your state into distorted shapes reminiscent of The Thing. Finally your
components are like the skin of your domain. They are generally defined by the
state and actions, but are more flexible to allow for different presentations.

Finally, remember that the components, action, and state collectively define a
language and grammar for your domain. You want to make concepts and statements
that are invalid and nonsensical inexpressible, while making all other valid
statements easy and convenient.

## Functions Everywhere

I'm pushing functional programming as far as it'll take me here, since
Javascript is a surprisingly pleasant environment for that. Ramda makes this
easier. You'll notice several utility functions, although my favorite might be
`action`. This is my favorite because it enables extensive code reuse by
allowing action creators to be specified as simple compositions of functions.

That's really the goal. Decompose problems into functions, which can then be
nicely composed with minimal syntax and semantics into larger problem solving
pieces.
