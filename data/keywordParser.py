path=""

keywords=open(path+"javaKeywords.txt");
data=""

for keyword in keywords:
	keyword=keyword.replace(" ","").replace("\t","")
	if keyword[len(keyword)-1] == "\n":
		data=data+'"'+keyword[:-1]+'"'+","
	else:
		data=data+'"'+keyword+'"'+","

keywords.close()
data=data[:-1]
csv=open(path+"javaKeywordsCSV.txt","w")
csv.write(data);
csv.close();
