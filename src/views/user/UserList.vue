<template>
  <div style="width: 800px; margin: 100px">
    <vxe-table
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xTable"
      height="600"
      :export-config="{}"
      :merge-cells="mergeCells"
      :sort-config="{ trigger: 'cell' }"
      :loading="loading"
      :scroll-y="{ enabled: true, oSize: 10 }"
      @scroll="throttledHandleScroll"
    >
      <vxe-column field="index" title="序号" width="100"></vxe-column>
      <vxe-column field="name" title="姓名" width="100"></vxe-column>
      <vxe-column field="email" title="邮箱" width="100"></vxe-column>
      <vxe-column
        field="title"
        title="Name1"
        sortable
        width="200"
        type="html"
      >
    </vxe-column>
      <vxe-column
        field="title1"
        title="Name2"
        sortable
        width="200"
      ></vxe-column>
      <vxe-column
        field="title2"
        title="Name3"
        sortable
        width="200"
        type="html"
      ></vxe-column>
      <vxe-column
        field="title3"
        title="Name4"
        sortable
        width="200"
      ></vxe-column>
      <vxe-column field="title4" title="name5" width="200"></vxe-column>
      <vxe-column field="title5" title="name6" width="200"></vxe-column>
      <vxe-column field="title6" title="name7" width="200"></vxe-column>
      <vxe-column field="attr10" title="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="text" size="mini" @click="handleOpen(row)"> 操作 </el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import VXETable from "vxe-table";
import axios from "axios";
import throttle from "lodash/throttle";

export default {
  data () {
    return {
      loading: false,
      mergeCells: [], // 合并单元格的规则
      userList: [],
      taskList: [],
      tableList: [],
      cachedData: {},
    };
  },
  created () {
    this.getUserList();
  },
  mounted () {
    this.loading = true;
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.reloadData(this.tableList).then(() => {
            console.log("Data reloaded successfully");
            this.updateTableData(); // 保证数据加载时没有重新计算合并规则
            this.loading = false;
          });
        } else {
          console.log("xTable ref is still null");
        }
      }, 200); // 延迟100毫秒
    });
  },
  computed: {
    refresh () {
      return <a onClick="handleRefresh">刷新</a>;
    },
    // renderHtml ({ row }) {
    //   return this.$createElement(
    //     'a', // 创建一个 <a> 标签
    //     {
    //       attrs: { href: 'javascript:void(0)' }, // 设置 href 属性
    //       on: { click: () => this.handleRefresh(row) }, // 绑定点击事件
    //     },
    //     '刷新' // 链接文本内容
    //   );
    // },
  },
  methods: {
    handleOpen (row) {
      console.log('open', row);
    },
    renderHtml ({ row }) {
      const link = this.$createElement(
        'a', // 创建一个 <a> 标签
        {
          attrs: { href: 'javascript:void(0)' }, // 设置 href 属性
        },
        '刷新' // 链接文本内容
      );

      this.$nextTick(() => {
        // 使用 Vue 的事件绑定
        link.elm.addEventListener('click', () => this.handleRefresh(row));
      });

      return link; // 返回虚拟节点
    },


    handleRefresh () {
      console.log('handleRefresh');
    },
    getUserList () {
      axios.post("/user/list").then((response) => {
        console.log("用户信息:", response.data);
        this.userList = response.data.data.list;
        this.transformList();
      });
    },
    async getTaskList (names) {
      return await axios
        .post("/task/list", {
          body: { names },
        })
        .then((response) => {
          console.log(response, "response");
          if (response.data.message === "success") {
            this.taskList = response.data.data.result;
            return response.data.data.result;
          } else {
            throw Error("error");
          }
          return {};
        });
    },
    async transformList () {
      const result = [];
      this.userList.forEach((item, index) => {
        if (item.number > 0) {
          const temp = Array.from({ length: item.number }, () => {
            return {
              name: item.name,
              email: item.email,
              number: item.number,
              index: index + 1,
              // title: '<i class="el-icon-loading"></i>',
              // title2: '<i class="el-icon-loading"></i>',
            };
          });
          result.push(...temp);
        }
      });
      this.tableList = result;
      this.calculateMergeCellsAndIndex(); // 初次计算合并规则
    },
    loadList () {
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.loadData(this.tableList);
        }
      });
    },
    // 计算合并规则并生成正确递增的序号
    calculateMergeCellsAndIndex () {
      const mergeRules = [];
      const rows = this.tableList;
      const processedData = [];
      let currentIndex = 1;
      let startRow = 0;

      while (startRow < rows.length) {
        let span = 1;

        // 找到连续相同的姓名和邮箱
        for (let i = startRow + 1; i < rows.length; i++) {
          if (
            rows[i].name === rows[startRow].name &&
            rows[i].email === rows[startRow].email
          ) {
            span++;
          } else {
            break;
          }
        }
        if (span > 1) {
          mergeRules.push(
            { row: processedData.length, col: 0, rowspan: span },
            { row: processedData.length, col: 1, rowspan: span },
            { row: processedData.length, col: 2, rowspan: span }
          );
        }

        for (let i = 0; i < span; i++) {
          processedData.push({
            ...rows[startRow + i],
            index: i === 0 ? currentIndex : "",
          });
        }
        currentIndex++;
        startRow += span;
      }
      this.mergeCells = mergeRules;
    },

    // 获取当前可视区域的行数据
    getVisibleRows () {
      const table = this.$refs.xTable;
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
          startIndex + Math.ceil(visibleHeight / rowHeight) + 20,
          allRows.length - 1
        );
        return allRows.slice(startIndex, endIndex + 1);
      }
      return [];
    },

    // 更新表格数据
    async updateTableData () {
      const visibleRows = this.getVisibleRows();
      const names = Array.from(
        new Map(visibleRows.map((item) => [item.name, item])).values()
      );
      const rowsToFetch = [];
      names.forEach((row) => {
        if (!this.cachedData[row.name]) {
          rowsToFetch.push(row);
        }
      });

      if (rowsToFetch.length > 0) {
        try {
        console.log(rowsToFetch, 'rowsToFetch');
          const fetchedData = await this.getTaskList(rowsToFetch);
          Object.entries(fetchedData).forEach(([name, data]) => {
            const pIndex = this.tableList.findIndex(
              (item) => item.name === name
            );
            const pItem = this.tableList.find((item) => {
              return item.name === name;
            });
            this.$set(this.cachedData, name, data);
            data.forEach((dataItem, dataIndex) => {
              this.$set(this.tableList, pIndex + dataIndex, {
                index: pItem.index,
                ...dataItem,
              });
            });
          });

          this.$nextTick(() => {
            this.$refs.xTable && this.$refs.xTable.reloadData(this.tableList);
            this.loading = false;
          });
        } catch (error) {
          console.log(rowsToFetch, "rowsToFetch");

          rowsToFetch.forEach((item) => {
            const pIndex = this.tableList.findIndex((t) => {
              return t.name === item.name;
            });
            this.$set(this.tableList, pIndex, {
              index: pIndex,
              ...this.tableList[pIndex],
              // title: '<a href="javascript:void(0);" @click="handleRefresh">刷新</a>',
            });
            this.$nextTick(() => {
              this.$refs.xTable && this.$refs.xTable.reloadData(this.tableList);
              this.loading = false;
            });
          });
        }
      } else {
        // this.loading = false;
      }
    },
    throttledHandleScroll: throttle(function () {
      this.updateTableData();
    }, 1000), // 降低滚动触发频率
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
