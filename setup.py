from setuptools import setup, find_packages
import os

version = '1.0'

long_description = (
    open('README.txt').read()
    + '\n' +
    'Contributors\n'
    '============\n'
    + '\n' +
    open('CONTRIBUTORS.txt').read()
    + '\n' +
    open('CHANGES.txt').read()
    + '\n')

setup(name='bst.pygasus.i18n',
      version=version,
      description="",
      long_description=long_description,
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
          "Programming Language :: Python",
      ],
      keywords='',
      author='',
      author_email='',
      url='http://svn.plone.org/svn/collective/',
      license='lgpl',
      packages=find_packages('src'),
      package_dir={'': 'src'},
      namespace_packages=['bst', 'bst.pygasus'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'fanstatic',
          'zope.i18n',
          'python-gettext',
      ],
      entry_points='''
          [fanstatic.libraries]
          i18n = bst.pygasus.i18n:library

          [lingua.extractors]
          extjs = bst.pygasus.i18n.extractor:ExtjsExtractor
      '''
      )
