from fanstatic import Library
from fanstatic import Resource
from js.jed import js as jed

library = Library('i18n', 'resources')
i18njs =  Resource(library, 'bb.extjs.i18n.js', depends=[jed])