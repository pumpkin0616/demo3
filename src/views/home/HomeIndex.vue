<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" :span-method="mergeCells">
      <!-- 序号列（合并展示） -->
      <el-table-column label="序号" align="center" width="80">
        <template #default="scope">
          {{ getRowIndex(scope.$index) }}
        </template>
      </el-table-column>
      <!-- 姓名列（合并展示） -->
      <el-table-column prop="name" label="姓名" align="center" />
      <!-- 年龄列（合并展示） -->
      <el-table-column prop="age" label="年龄" align="center" />
      <!-- 城市列（单独展示） -->
      <el-table-column prop="city" label="城市" align="center" />
    </el-table>
  </div>
</template>

<script>
import FixedPrefixTextarea from './FixedPrefixTextarea.vue';
import ChildForm from './ChildForm.vue';
export default {
  data () {
    return {
      tableData: [
        { name: '张三', age: 25, city: '北京' },
        { name: '张三', age: 25, city: '1' },
        { name: '张三', age: 25, city: '上海' },
        { name: '张三', age: 26, city: '广州' },
        { name: '李四', age: 30, city: '深圳' },
        { name: '李四', age: 30, city: '杭州' },
        { name: '王五', age: 22, city: '南京' },
        { name: '王五', age: 22, city: '杭州' }
      ],
      mergeFields: ['name', 'age'] // 需要合并的字段
    };
  },
  methods: {
    /**
     * 用于判断两行数据是否属于同一组
     */
    isSameGroup (row1, row2) {
      if (!row1 || !row2) return false;
      return this.mergeFields.every((field) => row1[field] === row2[field]);
    },

    /**
     * 用于合并单元格的逻辑
     */
    mergeCells ({ row, column, rowIndex, columnIndex }) {
      const data = this.tableData;

      // 针对需要合并的列（序号和 mergeFields 中的字段）
      if (columnIndex === 0 || this.mergeFields.includes(column.property)) {
        // 如果当前行是第一行，或者与上一行不是同一组，计算 rowspan
        if (rowIndex === 0 || !this.isSameGroup(row, data[rowIndex - 1])) {
          let rowSpan = 1;
          for (let i = rowIndex + 1; i < data.length; i++) {
            if (this.isSameGroup(row, data[i])) {
              rowSpan++;
            } else {
              break;
            }
          }
          return { rowspan: rowSpan, colspan: 1 };
        } else {
          // 当前行与上一行是同一组，隐藏单元格
          return { rowspan: 0, colspan: 0 };
        }
      }

      // 其他列单独展示
      return { rowspan: 1, colspan: 1 };
    },

    /**
     * 获取当前行的显示序号
     */
    getRowIndex (index) {
      const data = this.tableData;

      // 计算序号，只对每组的第一行显示序号
      let count = 0;
      for (let i = 0; i <= index; i++) {
        if (i === 0 || !this.isSameGroup(data[i], data[i - 1])) {
          count++;
        }
      }
      return count;
    }
  }
};
</script>
<style scoped>
.el-table th,
.el-table td {
  text-align: center;
}
</style>
