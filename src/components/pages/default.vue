<template>
	<Content :style="{padding: '0 16px 16px'}">
	    <Breadcrumb :style="{margin: '16px 0'}">
	        <BreadcrumbItem>首页</BreadcrumbItem>
	    </Breadcrumb>
	    <Card>
	        <div :style="{minHeight:contentHeight+'px'}" style="text-align: center">
            <h3>订单管理系统</h3>
            <p style="text-indent: 28px;text-align: left">
            
            </p>

	        </div>
	    </Card>

	</Content>
</template>

<script>
  export default {
    name: "default-page",
    data() {
      return {
        contentHeight:0
              }
    },
    methods: {
    },
    mounted() {
      this.contentHeight = Number(window.innerHeight - 170);
    },
    watch: {

    }
  }
</script>
