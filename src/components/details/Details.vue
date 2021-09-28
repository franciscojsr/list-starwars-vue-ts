<template src="./Details.html"></template>

<script lang="ts">

    import { defineComponent, ref, onMounted } from 'vue';
    import HttpService from '@/services/http.service';
    import Loading from './../../components/loading/Loading.vue';
    import { useRoute } from 'vue-router'
    import router from '../../router'


    export default defineComponent({
        name: 'Details',
        components: {
            Loading
        },
        props: {
            title: String,
            page: String
        },
        setup() {

            const route = useRoute();
            let details = ref('Details');
            let flag_loading = ref(true);
            let id = route.params.id;
            let listData: any = ref([]);

            let pages = ['people', 'planets', 'starships'];
            let path: string = 'people/'+id;

            async function getPage(){
                // await new Promise(resolve => setTimeout(resolve, 1000)); // Se espera x tiempo para acabar la animación
                for(let p of pages) {
                    let rgx = new RegExp(p, 'g');
                    if(router.currentRoute.value.path.match(rgx)){ path = p+'/'+id; break;}
                }
            }

            async function detailRequest() {
                let httpService = new HttpService(path);
                let request = await httpService.getAll();
                let list_data = request.data;
                for(let ld in list_data) {
                    if( ld!='homeworld' && ld!='films' && ld!='species' &&
                        ld!='created' && ld!='edited' && ld!='url' && ld!='vehicles' && ld!='starships' &&
                        ld!='residents' && ld!='pilots' && ld!='manufacturer'
                    ){
                        listData.value.push({label:ld, text: list_data[ld].toString()});
                    }
                }
            }

            onMounted(async() =>{
                await getPage();
                await detailRequest();
                flag_loading.value = false;
            })

            return { 
                listData,
                details,
                flag_loading
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./Details.scss" scoped></style>
