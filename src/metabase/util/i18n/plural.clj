(ns metabase.util.i18n.plural
  "Resources for parsing the Plural-Forms header from a translation file and determining which of multiple
  pluralities to use for a translated string."
  (:require [instaparse.core :as insta]))

(def ^:private plural-form-parser
  "This is a parser for the C-like syntax used to express pluralization rules in the Plural-Forms header in
  translation files.

  See the original gettext docs for more details on how pluralization rules work:
  https://www.gnu.org/software/gettext/manual/html_node/Plural-forms.html

  Operators with LOWER precedence are defined HIGHER in the grammar, and vice versa. A <maybe*> rule defines the
  grammar for all operators at or below a single level of precedence."
  (insta/parser
   "expr           = <s> maybe-ternary <s> <';'>? <s>

   <maybe-ternary> = ternary | maybe-or
   ternary         = maybe-or <s> <'?'> <s> maybe-or <s> <':'> <s> maybe-ternary

   <maybe-or>      = or-expr | maybe-and
   or-expr         = maybe-or <s> <'||'> <s> maybe-and

   <maybe-and>     = and-expr | maybe-eq
   and-expr        = maybe-and <s> <'&&'> <s> maybe-eq

   <maybe-eq>      = eq-expr | neq-expr | maybe-comp
   eq-expr         = maybe-eq <s> <'=='> <s> maybe-comp
   neq-expr        = maybe-eq <s> <'!='> <s> maybe-comp

   <maybe-comp>    = lt-expr | lte-expr | gt-expr | gte-expr | maybe-add
   lt-expr         = maybe-comp <s> <'<'> <s> maybe-add
   lte-expr        = maybe-comp <s> <'<='> <s> maybe-add
   gt-expr         = maybe-comp <s> <'>'> <s> maybe-add
   gte-expr        = maybe-comp <s> <'>='> <s> maybe-add

   <maybe-add>     = add-expr | sub-expr | maybe-mult
   add-expr        = maybe-add <s> <'+'> <s> maybe-mult
   sub-expr        = maybe-add <s> <'-'> <s> maybe-mult

   <maybe-mult>    = mult-expr | div-expr | mod-expr | terminal
   mult-expr       = maybe-mult <s> <'*'> <s> terminal
   div-expr        = maybe-mult <s> <'/'> <s> terminal
   mod-expr        = maybe-mult <s> <'%'> <s> terminal

   <terminal>      = integer | variable | parens
   <parens>        = <'('> <s> expr <s> <')'>
   <s>             = <#'\\s+'>*
   integer         = #'[0-9]+'
   variable        = 'n'"))

(defn- to-bool
  "Converts an integer or Boolean to a Boolean to use in a C-style logical operator."
  [x]
  (if (integer? x)
    (if (= x 0) false true)
    x))

(defn- to-int
  "Converts an integer or Boolean to an integer to use in a C-style arithmetic operator."
  [x]
  (if (boolean? x)
      (if x 1 0)
      x))

(defn- op
  "Converts a Clojure binary function f to a C-style operator that treats Booleans as integers, and returns an integer."
  [f]
  (fn [x y] (to-int (f (to-int x) (to-int y)))))

(defn plural-index
  "Returns the index of the translated string to use for a given value n, based on the Plural-"
  [plural-form n]
  (let [tree (insta/parse plural-form-parser plural-form)]
    (insta/transform {:add-expr  (op +)
                      :sub-expr  (op -)
                      :mult-expr (op *)
                      :div-expr  (op /)
                      :mod-expr  (op mod)
                      :eq-expr   (op =)
                      :neq-expr  (op not=)
                      :gt-expr   (op >)
                      :gte-expr  (op >=)
                      :lt-expr   (op <)
                      :lte-expr  (op <=)
                      :and-expr  #(to-int (and (to-bool %1) (to-bool %2)))
                      :or-expr   #(to-int (or (to-bool %1) (to-bool %2)))
                      :ternary   #(to-int (if (to-bool %1) %2 %3))
                      :integer   #(Integer. %)
                      :variable  (constantly n)
                      :expr      identity}
                     tree)))
