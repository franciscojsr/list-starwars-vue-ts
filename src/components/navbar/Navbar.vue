<template src="./Navbar.html"></template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ref, onMounted, onUnmounted, watch} from 'vue';

    import router from '../../router'


    export default defineComponent({
        name: 'Navbar',
        
        setup() {

            let showBack = ref(false);
            const checkback_class = ref('checkback');

            const goBack = () => {
                router.go(-1);
                // Cada vez que va atras se comprueba para ocultar el back icon
                showHidePathBack();
            }

            onMounted(async() =>{

            });


            onUnmounted(async() => {

            });

            async function showHidePathBack() {
                await new Promise(resolve => setTimeout(resolve, 250)); // Se espera x tiempo para acabar la animación
                if(router.currentRoute.value.path!='/'){
                    showBack.value = true;
                }
                else {
                    showBack.value = false;
                }
            }
            

            watch(router.currentRoute, () =>{
                    // console.log('changed');
                    // Se podría usar para detectar el cambio de route, pero se ha hecho de otra manera con host-listener
                }
            );

            return {
                goBack,
                showBack,
                showHidePathBack,
                checkback_class,
            }

        }
    });
</script>

<style lang="scss" src="./Navbar.scss" scoped></style>
