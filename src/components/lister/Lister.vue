<template src="./Lister.html"></template>

<script lang="ts">

  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import HttpService from '@/services/http.service';
  import Loading from './../../components/loading/Loading.vue';
  import router from '../../router'

  declare const M: any;


  export default defineComponent({
    name: 'ListerComp',
    components: {
      Loading
    },
    props: {
      title: String,
      page: String
    },
    setup() {


      // let page = ref('');

      let flag_loading = ref(false);

      let listData: any = ref([]);
      let listDataSecciones: any = ref([]);
      let totalItems: number;
      let nextPage: string;
      let totalSections: any = ref(0);
      let secciones = ref([]);
      let seccionesjson: any = [];
      let listDataChanges: any = [];

      let cont_loop = 0;
      let num_per_page = 30;

      let pages = ['people', 'planets', 'starships'];
      let path = '';

      async function getPage(){
        // await new Promise(resolve => setTimeout(resolve, 1000)); // Se espera x tiempo para acabar la animación
        for(let p of pages) {
          if(router.currentRoute.value.path.replace(/\//g,'')==p){ path = p; break;}
        }
      }


      /**
       * Se contruye el listado dinamicamente con 30 resultados por paginación, ya que la api solo permite de 10 en 10
       */
      async function loopPagesRequest(page: string, seccion: number, flag_changes: boolean) {
        let httpService = new HttpService(page);
        let request = await httpService.getAll();
        let data = request.data;

        // Para la primera página
        if(page==path) {
          totalItems = data.count;
          totalSections.value = Math.ceil(Number(totalItems/num_per_page)); // Se hacen cada seccion de 20 resultados
          nextPage = data.next;
          listData.value = data.results;
          // Se montan las secciones para el scrollspy 
          let count_loop = 1;
          for (let i = 0; i < totalSections.value; i++) {
            if(i!=0){count_loop = count_loop+2;}
            seccionesjson.push( {seccion: i, count_loop: count_loop} );
          }
          secciones.value = seccionesjson;
          listDataSecciones.value = seccionesjson;
          // Metiendo atributo nuevo id a results
          for(let d of listData.value){
            d.id = d.url.match(/[0-9]+\/$/g)[0].replace(/\//, '');
          }
        }
        else { // Para el resto de páginas
            request = await httpService.getAll();
            data = request.data;
            nextPage = data.next;
            listData.value = data.results;
            // console.log('listData.value');
            // console.log(listData.value);
            listData.value.concat(data.results);
            // Metiendo atributo nuevo id a results
            for(let d of listData.value){
              d.id = d.url.match(/[0-9]+\/$/g)[0].replace(/\//, '');
            }
        }

        // Se comprueba la seccion del cambio para resetear el array de datos
        if(!flag_changes){
          listDataChanges.push(...listData.value);
        }
        else {
          listDataChanges = [...listData.value];
        }

        if( listDataSecciones.value[seccion] ){
          listDataSecciones.value[seccion].list_data = [...listDataChanges];
        }

        // console.log('listDataSecciones');
        // console.log([...listDataChanges]);

        return listDataSecciones;
      }

      // const getList = async(): Promise<void> => {
      const getList = async(seccion: number, cont: number, val_cont: number, action: boolean): Promise<void> => {
        // let seccion = 0;
        cont_loop = cont;
        let flag_changes;
        if(!action){
          flag_changes = true;
          listDataSecciones = await loopPagesRequest(path, seccion, flag_changes);
        }
        flag_changes = false;
        let rest = 2;
        while(nextPage!=null && cont_loop<=val_cont){
          let regx = new RegExp(path+'.+', 'g')
          // nextPage = nextPage.match(/people.+/g)![0];
          nextPage = nextPage.match(regx)![0]; // dinámico
          
          listDataSecciones = await loopPagesRequest(nextPage, seccion, flag_changes);
          flag_changes = false;
          if(action){rest = val_cont;}
          if(cont_loop%rest==0){ seccion++; flag_changes = true; }
          cont_loop++;
        }
       

      };

      const loadNewData = async(seccion: number, count_loop: number) => {
        // Cada vez que renderiza nuevos se limpia el listData base
        listDataChanges = [];
        flag_loading.value = true;
        await getList(seccion, cont_loop, count_loop+2, true);
        flag_loading.value = false;
      }

      async function getResult() {
        flag_loading.value = true;
         // Si despues de 10s no retorna nada que se pare el loading
        const id_stt= setTimeout(() => {
          flag_loading.value = false;
          M.toast({html:' Connexion lenta! Ha habido un problema de connexion. Intentelo de neuvo más tarde'}); 
        }, 10000); // Se espera x tiempo para acabar la animación - por si hay fallo o tarda mucho
        await getList(0, 1, 2, false);
        clearTimeout(id_stt);
        flag_loading.value = false;

        // scrollspy materialize
        const options = {
          fullWidth: true,
          indicators: true,
          throttle: 100,
          scrollOffset: 264,
        };
        var elems = document.querySelectorAll('.scrollspy');
        M.ScrollSpy.init(elems, options);
        // var instances = M.ScrollSpy.init(elems, options);
      }

      onMounted(async() =>{
        await getPage();
        await getResult();
      })

      onUnmounted(async() => {

      });

      return { 
        flag_loading,
        listDataSecciones,
        secciones,
        loadNewData,
      }
    }
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./Lister.scss" scoped></style>
