<template>
    <transition name="dialog-fade">
        <div class="container-dialog" style="color: white;">
            <div :class="'size-' + (size? size:'medium')" class="container-centered" style="font-size: 14px">
                <h1 class="container-centered-title">{{title||'提示'}}
            </h1>
                <div class="container-centered-body">
                    <div class="container-centered-info">
                        <slot name="body"></slot>
                    </div>
                    <div class="container-centered-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'YmtDialog',
        props: ['title', 'cancelCallBack', 'comfirmCallBack', 'size'],
        data () {
            return {
            }
        },
        mounted: function () {

        },
        created: function () {

        },
        methods: {
            cancel () {
                this.$emit('toggle', false);
            },
            success () {
                this.$emit('toggle', true);
            },
            goBack () {
                this.$emit('toggle');
            }
        },
    }
</script>


<style lang="less" scoped>
    .container-dialog {
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.80);

        .container-centered {
            position: absolute;
            left: 50%;
            top: 50%; /*偏移*/
            transform: translate(-50%, -50%);
            background-color: white;
            color: black;

            .container-centered-title {
                position: relative;
                height: 40px;
                line-height: 40px;
                color: #27292f;
                font-size: 15px;
                text-indent: .5em;
                background: #e0e0e0;
            }

            .container-centered-body {
                padding: 20px 0;

                .container-centered-footer {
                    margin-top: 2em;
                }
            }
        }
    }

    .size-small {
        width: 370px;
    }

    .size-medium {
        width: 510px;
    }

    .size-large {
        width: 1000px;
    }


</style>