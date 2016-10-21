let source = ''
      {
        "owner": "NixOS",
        "repo": "nixpkgs-channels",
        "rev": "ddd9a8390fd8ea7f3148e23143d6ae260bfd0da0",
        "sha256": "0zj16s6y52zspgvy61d3z78whw7fkzyph1fsi649n525aipd9xxg"
      }
      '';
in
import ((import <nixpkgs> {}).fetchFromGitHub (builtins.fromJSON (source)))
