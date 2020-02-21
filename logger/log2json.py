#!/usr/bin/env python

import csv

# save the json output as emp.json 
# jsfile = file('/var/www/html/assets/probelog.json', 'w')
jsfile = file('../src/assets/probelog.json', 'w')
jsfile.write('[\r\n')

with open('./probez.txt','r') as f:
    next(f) # skip headings
    reader=csv.reader(f,delimiter='\t')

    uniqProbez = []
    ite = 0
    # back to first position
    f.seek(0)
    next(f) # skip headings

    for prs in reader:
        if prs not in uniqProbez:
            if "ALFA, INC." not in prs and "UNKNOWN" not in prs:
                uniqProbez.append(prs)

    # get the total number of rows excluded the heading
    row_count = len(list(uniqProbez))
    
    
    for timestamp,mac,device,ssid,log in uniqProbez:

        ite+= 1
        
        jsfile.write('\t{\r\n')
        
        t = '\t\t\"timestamp\": \"' + timestamp + '\",\r\n'
        m = '\t\t\"mac\": \"' + mac + '\",\r\n'
        d = '\t\t\"device\": \"' + device + '\",\r\n'
        s = '\t\t\"ssid\": \"' + ssid + '\",\r\n'
        l = '\t\t\"log\": \"' + log + '\"\r\n'
       
        jsfile.write(t)
        jsfile.write(m)
        jsfile.write(d)
        jsfile.write(s)
        jsfile.write(l)

        jsfile.write('\t}')

        # omit comma for last row item
        if ite < row_count:
            jsfile.write(',\r\n')

        # jsfile.write('\r\n')

jsfile.write(']')
jsfile.close()