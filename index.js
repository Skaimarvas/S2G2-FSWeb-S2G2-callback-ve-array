const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz *	

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

const ikiBinOnDort = fifaData.filter((ikibin) => ikibin.Year === 2014);
console.log("Görev 1", ikiBinOnDort);

const evSahibiUlkeler = ikiBinOnDort.map(
  (evSahibi) => evSahibi["Home Team Name"]
);
console.log("Görev 1a", evSahibiUlkeler);

const deplasmanUlkeler = ikiBinOnDort.map(
  (deplasman) => deplasman["Away Team Name"]
);
console.log("Görev 1b", deplasmanUlkeler);

const evSahibiGolleri = ikiBinOnDort.map(
  (evSahibiGol) => evSahibiGol["Home Team Goals"]
);
console.log("Görev 1c", evSahibiGolleri);

const deplasmanGolleri = ikiBinOnDort.map(
  (deplasmanGol) => deplasmanGol["Away Team Goals"]
);
console.log("Görev 1d", deplasmanGolleri);

const ikiBinOnDortCham = fifaData.filter(
  (ikibin) => ikibin.Year === 2014 && ikibin.Stage === "Final"
);

console.log("Görev 1e", ikiBinOnDortCham);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
  const finalMaclari = arr.filter((finalMac) => finalMac.Stage === "Final");

  return finalMaclari;
}

console.log("Görev 2", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arrm, callback) {
  const fifaYillari = callback(arrm);
  const finalYillari = fifaYillari.map((sadeceYil) => sadeceYil.Year);
  return finalYillari;
}

console.log("Görev 3", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arrYeter, callback) {
  const finaldekiler = callback(arrYeter);
  const kazananUlkeler = finaldekiler.map((lider) => {
    if (lider["Home Team Goals"] > lider["Away Team Goals"]) {
      return lider["Home Team Name"];
    } else {
      return lider["Away Team Name"];
    }
  });
  return kazananUlkeler;
}

console.log("Görev 4", Kazananlar(fifaData, Finaller));
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dizidizi, callback1, callback2, callback3) {
  const yillaraGoreChamp = [];
  const finalYears = callback2(dizidizi, callback1);
  const finalCountries = callback3(dizidizi, callback1);
  let finalYil = 0;
  let count = null;
  for (let i = 0; i < finalYears.length; i++) {
    finalYil = finalYears[i];
    count = finalCountries[i];

    yillaraGoreChamp.push(
      `${finalYil} yılında, ${count} dünya kupasını kazandı!`
    );
  }

  return yillaraGoreChamp;
}

console.log(
  "Görev 5",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(fnc) {
  const gazanKaynadi = fnc;
  const toplamGol = gazanKaynadi.reduce((toplam, maç) => {
    const yilGol = maç["Home Team Goals"] + maç["Away Team Goals"];
    return toplam + yilGol;
  }, 0);

  // const toplamGoller = fifaData.reduce((toplamGol, yilGol) => {
  //   const gazanKaynadi = fnc();
  //   yilGol = gazanKaynadi["Home Team Goals"] + gazanKaynadi["Away Team Goals"];
  //   toplamGol += yilGol;

  //   return toplamGoller;
  // }, 0);

  let num = toplamGol / gazanKaynadi.length;
  let n = num.toFixed(2);
  return n;
}

console.log("Görev 6", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(soccer, shortage) {
  const finalstage = soccer.filter((match) => match["Stage"] === "Final");

  const kazanmaObj = finalstage.reduce((winObj, currentMatch) => {
    const home = currentMatch["Home Team Initials"];
    const away = currentMatch["Away Team Initials"];
    const homeGoals = currentMatch["Home Team Goals"];
    const awayGoals = currentMatch["Away Team Goals"];
    console.log("winObj", winObj);
    if (homeGoals > awayGoals) {
      if (winObj[home]) {
        winObj[home] = winObj[home] + 1;
      } else {
        winObj[home] = 1;
      }
    } else {
      if (winObj[away]) {
        winObj[away] = winObj[away] + 1;
      } else {
        winObj[away] = 1;
      }
    }
    return winObj;
  }, {});

  return kazanmaObj[shortage];
}
console.log("BONUS 1", UlkelerinKazanmaSayilari(fifaData, "BRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(soccer) {
  const finalStage = soccer.filter((match) => match["Stage"] === "Final");

  const mostGoals = finalStage.reduce((goals, currentMatch) => {
    const home = currentMatch["Home Team Initials"];
    const away = currentMatch["Away Team Initials"];
    const homeGoals = currentMatch["Home Team Goals"];
    const awayGoals = currentMatch["Away Team Goals"];

    console.log("Goals", goals);

    if (goals[home]) {
      goals[home] = goals[home] + homeGoals;
    } else {
      goals[home] = homeGoals;
    }

    if (goals[away]) {
      goals[away] = goals[away] + awayGoals;
    } else {
      goals[away] = awayGoals;
    }

    return goals;
  }, {});

  const numberone = Math.max(...Object.values(mostGoals));

  for (const iterator in mostGoals) {
    if (mostGoals[iterator] === numberone) return iterator;
  }
}

console.log("En çok golü atan Takım", EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(soccer) {
  const finalStage = soccer.filter((match) => match["Stage"] === "Final");

  const mostGoals = finalStage.reduce((goals, currentMatch) => {
    const home = currentMatch["Home Team Initials"];
    const away = currentMatch["Away Team Initials"];
    const homeGoals = currentMatch["Home Team Goals"];
    const awayGoals = currentMatch["Away Team Goals"];

    console.log("Goals", goals);

    if (goals[home]) {
      goals[home] = goals[home] + awayGoals;
    } else {
      goals[home] = awayGoals;
    }

    if (goals[away]) {
      goals[away] = goals[away] + homeGoals;
    } else {
      goals[away] = homeGoals;
    }

    return goals;
  }, {});
  const numberone = Math.max(...Object.values(mostGoals));

  for (const iterator in mostGoals) {
    if (mostGoals[iterator] === numberone) return iterator;
  }
}

console.log("En Çok Gol Yiyen Takım", EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
