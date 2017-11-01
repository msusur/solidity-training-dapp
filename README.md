# Ethereum Eğitim Kayıt Uygulaması
Bu uygulama ile, Ethereum eğitimimize katılacak olan lise ve üniversite öğrencilerini kayıt altına almayı ve biraz da sadece gerçekten Blockchain ve Ethereum'a ilgisi olanları ayırt etmeyi hedefliyoruz.

`Ethereum Eğitim Kayıt Uygulaması` ile, bir Dapp uygulamasının nasıl kullanıldığını deneyimlemiş ve öğrenmiş olacaksınız.  Bu sebeple kayıt işlemine geçmeden önce bu dökümanı okumanız gerekmektedir.

Yapmanız gerekenler gerçekten çok basit. Hiç merak etmeyin, bir problemle karşılaşırsanız [Mert Susur](https://www.twitter.com/mertsusur)'a ya da [Onur Aykaç](https://www.twitter.com/onurgil)'a ulaşıp destek isteyebilirsiniz.

Kolları sıvadıysak başlayabiliriz.

## Nasıl kayıt olurum?
Yapılması gereken ilk şey [Metamask](https://metamask.io/)'ı Chrome'unuza kurmak. Metamask basitçe, Dapp ile Ethereum cüzdanınız arasında köprü görevi gören bir Chrome Extension'udur. Bizim örneğimizde Dapp, bu repository'de gördüğünüz ve sizin için hazırladığımız kayıt formu uygulamasıdır.

Extension'u indirdikten sonra bir şifre belirleyip Metamask'ı kullanmaya başlayabilirsiniz. Kayıt uygulamamız Rinkeby ağında çalıştığı için extension'un sol üstünden Rinkeby ağına geçmeniz gerekmektedir. Geçiş yaptığınızda `Àccount 1` adında bir hesabın yaratılmış olduğunu göreceksiniz.

Hemen bir parantez açarak uygulamanın nasıl çalıştığına değinelim. Uygulamamızda girilen e-mail adresleri bir database'de tutulmamaktadır. Tüm veriler Ethereum network'ü üzerinde tutulmaktadır. Tabii yukarda da bahsettiğimiz gibi gerçek ağda değil, Rinkeby ağında yani bir test ortamında tutulmaktadır. 

Bu noktada e-mail adresiniz ile Ethereum adresiniz eşleştirilerek tutulmaktadır. Bu da, Rinkeby ağında bir adrese ihtiyacınız olduğu anlamına geliyor ki yukarda Metamask'ı kurup Rinkeby'e geçtiğinizde bu adrese sahip olacağınızı belirtmiştik. Tabii her şey bununla bitmiyor.

Gerçek Ethereum ağına bir veri yazmak için belirli bir miktar ücret ödemeniz gerekmektedir. Buna `Transaction fee` adı verilmekte. Gerçek Ethereum ağında olduğu gibi Rinkeby ağında da bu ücretin ödenmesi gerekmektedir. Fakat bu, gerçek ağdaki gibi USD, Euro, TL gibi gerçek para karşılığı olan bir şey değildir.

Rinkeby, Robsten gibi ortamlar tamamen test ortamları oldukları için ve aslen geliştirme zamanında kullanıldıkları için gerçek para ile yapılmaz buradaki işler. Bunun yerine bazı servisler kullanarak hesabınızda para yaratırsınız. Rinkeby ağı için bu servis şudur: https://faucet.rinkeby.io/

Şimdi hesabımıza nasıl test ether'i aktaracağımıza değinelim. Öncelikle Metamask'ı açıp `Account 1`'in sağındaki üç noktadan Copy Address to clipboard diyoruz. Bu adresimizi, Facebook, Twitter ya da hiçbir arkadaşımızın ekli olmadığı Google+'a post olarak giriyoruz. Fakat önemli olan, postta sadece bu adresimiz oluyor. Başka bir yazı yazmıyoruz. Şurada bir örneği mevcut: https://plus.google.com/109087235038332478392/posts/EcfdTxCmrw8?hl=tr

Sonrasında bu postumuzun linkini alıp faucet'e yapıştırıyoruz ve sağ taraftaki `Give me Ether`'den istediğimizi seçiyoruz. Birkaç saniye sonrasında Metamask'tan aldığımız adresimizi https://rinkeby.etherscan.io adresinde aratıp, bakiyemizi görebiliriz. Şimdi Rinkeby ağına e-mail adresimizi yazdırmak için gerekli olan `Transaction fee`'yi karşılayabiliriz.

Her şey hazır görünüyor. Şimdi [kayıt uygulamamıza](https://solidity.herokuapp.com/) girebiliriz. Hala kontenjan varsa okul e-mail adresinizi doğru bir şekilde yazalım ve `KAYIT OL` butonuna tıklayalım. Karşınıza şu şekilde bir ekran gelecek:

![Onay ekranı](http://oi66.tinypic.com/8y7wp4.jpg)

Şimdi `Submit` butonuna tıklayıp Rinkeby network'ünde yeni bir transaction yaratılmasını sağlayabilirsiniz.

Bundan sonrasında ise, yazdığınız e-mail adresinize bir onay e-mail'i gelecek. Buna tıklayarak kayıt işlemini sonlandırabileceksiniz.

> Onay mail'inin gelmesi biraz vakit alabilir. Şu an biz de kestiremiyoruz ama baktınız beş günü-on günü geçiyor onay mail'inin gelmesi, yine bizimle iletişime geçin lütfen.

> Bir adres ile sadece bir kayıt işlemi yapabilirsiniz.


## Ne yaptım ben şimdi?
Kayıt oldunuz! Ve daha da önemlisi bir Dapp uygulaması kullanırken, mevcutta genel kabul görmüş olan yöntemi (Metamask) uyguladınız. Bu sayede Ethereum private key'inizi veya şifrenizi paylaşmadan transaction gerçekleştirdiniz!


## Daha fazla istiyorum, daha fazla!
Öncelikle `contracts` klasörü altında, kayıt ol işleminde çalışan `Smart Contract`'ı görebilirsiniz. İsmi `training.sol`. Kayıt olduğunuzda `contract` üzerinde tutulan bilgileriniz sadece bizim tarafımızdan (owner) görüntülenebilirç

Ama kafa karışıklığına neden olmamak adına daha fazla detay vermiyoruz. Eğitimde bu konuların üzerinden zaten geçeceğiz. 

## Ben de kullanabilir miyim bu uygulamayı?
Tabi ki! Basic Smart Contract ve Ethereum bilginiz varsa çok kolay bir şekilde uygulamayı kendiniz için çalıştırabilirsiniz. Öncelikle contract'ı kendi cüzdan adresiniz ile deploy edin ve owner olun, sonrasında uygulamayı indirip `./static/lib/app.js` dosyasındaki contractAddress alanını, kendi yarattığınız contract'ın adresi ile değiştirin ve uygulamayı deploy edin. İşte bu kadar.

Tabi ki şunları çalıştırmayı unutmayın:
    npm install
    npm prestart


## Eğitimdeki konu başlıkları
    Basics of a contract (How to use Remix)
    Metamask ve Rinkeby
    Contract Deployment

## Daha da fazlasını öğrenmek için ne yapmalıyım?
Eğitimde bunlardan da bahsedeceğiz ama öncesinde paylaşmak istediğimiz bir şey var. O da eğitim tamamlandığında aranızdan bazı kişilere, mevcutta devam eden Ethereum projemize katılma davetinde bulunacağız. Codefiction ekibi ile birlikte tüm toplantılara katılacak, proje geliştirme ve karar süreçlerinde yer alacaksınız. 

## Son
Herhangi bir sorunuz olursa bize ulaşmak konusunda çekinmeyin lütfen. Görüşmek üzere!

* [Mert Susur](https://www.twitter.com/mertsusur)
* [Onur Aykaç](https://www.twitter.com/onurgil)
