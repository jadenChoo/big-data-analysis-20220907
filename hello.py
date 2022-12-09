import re

if __name__ == "__main__":
    print ("Hello world")
    print ("This is develop branch")
    print ("THis is bug fix")
    byline = "최태범 기자 (bum_t@mt.co.kr)"
    byline2 = "세종 = 최태범 기자 (bum_t@mt.co.kr)"
    if "=" in byline:
        byline = byline.split('=', 1)[2]

    if "=" in byline2:
        byline2 = byline2.split('=', 1)[1].strip()
    print(byline)
    print(byline2)
    m = re.match(r'(([\wㄱ-ㅎ가-힣]+)?\s?=?\s?([\wㄱ-ㅎ가-힣]+))\s*(기자)?\s*(\(?[\w\.]+@[\w\.]+\)?)?', byline)
    # m2 = re.match(r'\w*=([\wㄱ-ㅎ가-힣]+)\s*(기자)?\s*(\(?[\w\.]+@[\w\.]+\)?)', byline) # 교수님버전
    print("m1")
    for i in range(0,4):
        print(m[i])

    # print("m2")
    # for i in range(0,4):
    #     print(m2[i])
