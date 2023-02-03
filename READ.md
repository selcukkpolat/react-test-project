# Ticimax Project
## Uygulama Hakkında

Uygualama react-native ile geliştirilmiştir.

## Kullanılan Paketler

- "@react-native-async-storage/async-storage": "1.17.11"
-  "react": "17.0.2"
-  "react-native": "0.66.0"

Uygulamayı başlatmadan önce;
```sh
npm install
```

## Uygulamanın Çalışması Hakkında
Uygulama Yeni Post Oluşturm, Postları Listeleme, Postları Sıralama, Beğeni Sayısını Artırma ve Azaltma, Postu Silme işlemleri yapmaktadır.
## Özellikler

Yeni Post Oluşturma

- Submit A Post Buttonu sonrasında CreatePostModal açılır.
- Burada 2 alan vardır title ve description kullanıcıdan bunları doldurması beklenir. 
- title ve description boyutu 3'den küçükse uygulama içerisinde bulunan Toast Componenti ile ilgili geri bildirim verilir. 
- Gerekli alanlar eksiksiz doldurulduğunda oluşturulan Post listeye ve AsyncStorege'a eklenir. 
- Eklenirken id, tarih ve like sayısı nesneye eklenir. 

Postları Listeleme

- Uygulama ilk açıldığında AsyncStorage'dan liste okunur, kayıtlı olan liste ekran'da FlatList ile listelenir.

Postları Sıralama

- Listenen postlar'ı uygulamada bulunan iki button ile sıralama yapılır.
- En çok like alandan en aza ve en az like alandan en çok like alana göre sıralanır.

Beğeni Sayısı Artırma ve Azaltma

- Her bir postun bir like sayısı vardır ve bunu uygulamada bulunan 2 button ile artırım  ve azaltma yapılır.

Postu Silme

- Her post üzerinde bir silme işlemi yapabileceği bir button vardır. 
- Silme buttonuna basınca uygulamada component Confirm Modal belirir. Silme işlemi için son onay alır.
- Silme işlemi onaylandığında listeden silinir ve Asyncstorage'e kaydedilir.
