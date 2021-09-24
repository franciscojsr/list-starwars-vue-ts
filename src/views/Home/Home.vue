<template src="./Home.html"></template>

<script lang="ts">


    import { defineComponent } from 'vue';    
    import { ref, onMounted } from 'vue';

    import router from '../../router'


    export default defineComponent({
        name: 'Home',
        setup() {

            let listData: any = ref([]);
        
            const getList = async(): Promise<void> => {
                listData.value = [
                    { id: 1, text: 'People' , router: 'people'},
                    { id: 2, text: 'Starships' , router: 'starships'},
                    { id: 3, text: 'Planets', router: 'planets'}
                ];
            }



            const goToSection = (section: string) => {
                router.push(section);
                
            }

            async function showHidePathBack() {

            }

            onMounted(async() =>{
                await getList();
            });

            return {
                goToSection,
                listData,
                showHidePathBack
            }

        }

    });
</script>

<style lang="scss" src="./Home.scss" scoped></style>
