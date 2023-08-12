

class MarvelService {

   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=dd380dc0702d512034508b86c60f75f0';
   _baseOffset = 210; 

   getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }
      return await res.json();
   };

   /**
    * функция возвращает персонажей подряд начиная с значения  offset 
    * @returns 
    */
   getAllCharacters = async (offset = this._baseOffset) => {
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
      return res.data.results.map(this._transformCharacter);
   }  

   // /**
   //  * Функция возвращает случайных персонажей  для 12 карточек
   //  * @returns 
   //  */
   // getAllCharacters = async () => {
   //    let i = 1;
   //    let res = [];
   //    do {
   //       let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
   //       res.push(await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`));
   //       i++;
   //    } while (i <= 12)
   //    return res.map(caracter => this._transformCharacter(caracter.data.results[0]));
   // }  
   
   get5Characters = async () => {
      let i = 1;
      let res = [];
      do {
         let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
         res.push(await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`));
         i++;
      } while (i <= 5)
      return res.map(caracter => this._transformCharacter(caracter.data.results[0]));
   }  

   getCharacter = async (id) => {
      const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformCharacter(res.data.results[0]);
   }

   _transformCharacter = (char) => {
      return {
         id: char.id,
         name: char.name,
         description: char.description,
         thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items
      }
   }
}
export default MarvelService;