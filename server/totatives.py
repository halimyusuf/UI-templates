def phi(n):
    count = 0
    i = 0
    if n % 2 == 0:
        while i<n:
            i+=1
            m = n % i
            if i == 1:
                count+=1
            elif i% 2 == 0:
                count
            elif m == 0:
                count
            elif m == 1 :
                count+=1
            elif n % m == 0:
                count
            else :
                count += 1

    else:
        while i<n:
            i+=1
            m = n % i
            if i == 1:
                count+=1
            elif m == 0:
                count
            elif m == 1 :
                count+=1
            elif n % m == 0:
                count
            else :
                count += 1
    return count

print(phi(9))

