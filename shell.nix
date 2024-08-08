{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.nodePackages.npm
    pkgs.yarn
  ];

  shellHook = ''
    echo "====================================================="
    echo "Welcome to the Tezos-connect development environment!"
    echo "====================================================="
  '';
}
