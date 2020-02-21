 _     ___   ____  ____ _____ ____  
| |   / _ \ / ___|/ ___| ____|  _ \ 
| |  | | | | |  _| |  _|  _| | |_) |
| |__| |_| | |_| | |_| | |___|  _ < 
|_____\___/ \____|\____|_____|_| \_\


OUTLINE
--------------

To grab probe requests and log them, then tally them up even.


HARDWARE
--------------

My home PC and Ubuntu, which I occasionally weaponize like this.

One ALFA AWUS036NHA, this card supports monitor mode, which is needed and it totally rips. 

I bought a TP-Link TL-WN722N but it was a V2.0, and so didn't have the Atheros chipset. The Alfa is better than my $$$ broadcom, seriously.


DEPENDENCIES
--------------

Python
Python setuptools
netaddr
scapy
probemon
aircrack-ng

git clone https://github.com/drkjam/netaddr
cd netaddr
sudo python setup.py install
cd
git clone https://github.com/secdev/scapy.git
cd scapy
sudo python setup.py install

git clone https://github.com/nikharris0/probemon.git
cd probemon
sudo python probemon.py

Needed to install aircrack-ng

sudo apt install aircrack-ng


STEPS
--------------

Find the network device using ifconfig, then fire up the ALFA in monitor mode:

sudo airmon-ng start wlx00c0ca96c3ac

Then we can start logging requests:

sudo python probemon.py -i mon1 -t unix -o ~/testOutput -f -s -r -l | tee logger-out-20102917.txt