<template>
  <div style="width: 1300px">
    <!-- @scroll="handleTableScroll" -->

    <vxe-table
      border
      show-overflow
      ref="tableRef"
      height="600"
      :column-config="columnConfig"
      :merge-cells="mergeRowData"
      :cell-style="{ height: '20px' }"
      :scroll-y="scrollY"
      :data="tableData"
      :row-config="{ keyField: 'index', useKey: true }"
    >
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name" min-width="100"></vxe-column>
      <vxe-column field="role" title="Role" min-width="100"></vxe-column>
      <vxe-column field="sex" title="Sex" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column field="age" title="Age" min-width="100"></vxe-column>
      <vxe-column
        field="age"
        title="Age"
        min-width="100"
        fixed="right"
      ></vxe-column>
      <!-- <vxe-column field="address" title="Address" min-width="100" fixed="right"></vxe-column> -->
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    const tableData = [];
    const columnConfig = {
      resizable: true,
    };

    // const mergeFooterItems = [
    //   { row: 0, col: 1, rowspan: 2, colspan: 1 }
    // ];
    const scrollY = {
      enabled: true,
      gt: 0,
    };
    return {
      tableData,
      columnConfig,
      scrollY,
      mergeRowData: [],
    };
  },
  computed: {},
  methods: {
    // 获取当前可视区域的行数据
    // handleTableScroll () {
    //   const table = this.$refs.tableRef;
    //   if (table) {
    //     const tableBodyWrapper = table.$el.querySelector(
    //       ".vxe-table--body-wrapper"
    //     );

    //     // 获取所有渲染的行 DOM 元素
    //     const rowElements = tableBodyWrapper.querySelectorAll(".vxe-body--row");
    //     if (rowElements.length === 0) {
    //       return [];
    //     }
    //     // 获取表格的数据
    //     const allRows = table.getTableData().fullData;
    //     const rowId = Number(rowElements[0].getAttribute("rowid"));
    //     // 如果没有渲染的行元素，返回空数组
    //     const startIndex = allRows.findIndex(
    //       (item) => item.index === rowId
    //     ); // 第一行在 DOM 中的位置
    //     const endIndex = startIndex + rowElements.length - 1; // 最后一行的位置
    //     // 获取渲染的行数据
    //     // const renderedRows = allRows.slice(startIndex, endIndex + 1);
    //     console.log(startIndex, endIndex, 'start');
    //     this.updateMergeCells(startIndex, endIndex);
    //   }
    //   return [];
    // },
    // 获取当前可视区域的行数据
    handleTableScroll () {
      const table = this.$refs.tableRef;
      if (table) {
        const tableBodyWrapper = table.$el.querySelector(
          ".vxe-table--body-wrapper"
        );
        const allRows = table.getTableData().fullData;
        const rowHeight =
          table.$el.querySelector(".vxe-body--row").offsetHeight;
        const visibleHeight = tableBodyWrapper.offsetHeight;
        const scrollTop = tableBodyWrapper.scrollTop;
        const startIndex = Math.floor(scrollTop / rowHeight);
        const endIndex = Math.min(
          startIndex + Math.ceil(visibleHeight / rowHeight) + 100,
          allRows.length - 1
        );
        console.log(startIndex, endIndex, "index");
        this.updateMergeCells(startIndex, endIndex);
      }
    },
    // 计算可见区域的合并单元格
    updateMergeCells (start, end) {
      const result = [];
      for (let i = start; i < end; i += 2) {
        result.push({ row: i, col: 1, rowspan: 2, colspan: 2 });
      }
      this.mergeRowData = result;
    },
    mergeRow () {
      const result = [];
      this.tableData.forEach((item, index) => {
        if (index % 2 === 0) {
          result.push({ row: index, col: 1, rowspan: 2, colspan: 2 });
        }
      });
      this.mergeRowData = result;
    },
    // 模拟行数据
    loadList (size = 200) {
      const dataList = [];
      for (let i = 0; i < size; i++) {
        dataList.push({
          index: i,
          id: 10000 + i,
          name: "Test" + i,
          role: "Developer",
          sex: "男",
          age: 20,
          address: "Address abc",
        });
      }
      this.tableData = dataList;
    },
  },
  created () {
    this.loadList(2000);
    this.mergeRow();
    // this.$nextTick(() => this.handleTableScroll());
  },
};
</script>
<style>
.vxe-table--render-default .vxe-table--body-wrapper {
  background-color: transparent !important;
}
.vxe-table--render-wrapper {
  background-color: transparent !important;
}
.vxe-table--body{
  background-color: transparent !important;

}
.vxe-table--main-wrapper .vxe-table--render-default .vxe-table--body-wrapper,
.vxe-table--main-wrapper .vxe-table--render-default .vxe-table--footer-wrapper {
  background-color: transparent !important;
}
</style>
