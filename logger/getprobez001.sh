#!/bin/bash

echo "[*] get probe requests into file liveprobes001.txt in /logger/outfiles"
echo "[*] Setting up network..."

probe_interface=`/sbin/ifconfig | grep mon0 | cut -d" " -f1`

if [[ $probe_interface ]]
	then
		echo "[!] Interface mon0 is up! using that";
	else
		echo "[!] Mon0 not up, starting now...";
		sudo airmon-ng start wlx00c0ca96c3ac
fi

#echo "" > ~/projects/secure-server-v2/logger/outfiles/liveprobes001.txt
echo "" > ~/projects/secure-server-v2/logger/probez.txt

sudo python probemon/probemon.py -i mon0 -t unix -f -s -r -l -o ~/projects/secure-server-v2/logger/probez.txt
