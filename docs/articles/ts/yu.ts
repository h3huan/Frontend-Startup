//DataHelper 类 负责 Localstorage 操作
class DataHelper {
    dataKey: string;
    primaryKey: string;

    //let dh = new DataHelper('plData', 'id');

    //构造函数 --为对象 添加各种属性
    constructor(dataKey: string, primaryKey: string) {
        this.dataKey = dataKey;
        this.primaryKey = primaryKey;
    }

    //1。读取全部数据，返回数组
    readData(): any{
        //1. 读取本地 o数据
        let strData: string | null = localStorage.getItem(this.dataKey);
        //2. 将 json 数组 字符串转成 数组对象。
        let arrayData: any = [];
        if (strData != null){
            arrayData = JSON.parse(strData);
        }
        //3. 返回数组
        return arrayData;
    }

    //2。存入本地数据
    saveData(arrayData: Array<Object>):void{
        //1. 数组转成 Json 字符串
        let str: string = JSON.stringify(arrayData);
        //2. 将字符串保存到本地 localstorage 中
        localStorage.setItem(this.dataKey, str);
    }

    //3，新增数据
    addData(conStr: string): number{
        //1. 读取本地现有数据
        let arr: any = this.readData();

        //2。创建一个评论对象，并设置评论内容属性
        let obj: Object = {
            content: conStr
        }

        //3.1 自动生成一个主键值{id}
        let newId = arr.length > 0 ? arr[arr.length - 1][this.primaryKey] + 1 : 1;

        //3.2 将 id 通过 中括号访问法 添加到对象
        // obj[this.primaryKey] = newId;
        // @ts-ignore
        obj[this.primaryKey] = newId;

        //4。将添加 主键值 的 对象 添加到数组。
        arr.push(obj);

        //5。将数组积存到 localstorage 中
        this.saveData(arr);
        //6。返回 id
        return newId;
    }

    //4. 删除数据
    removeDataById(id: string | number): boolean{
        //读取本地数组
        let arr = this.readData();

        //查找删除 评论对象的 下标 并保存本地
        // @ts-ignore
        let index = arr.findIndex((ele) => {
            
            return ele[this.primaryKey] == id;
        });

        //如果下标 》 -1 删除数组中该下标元素对象，并返回 true
        if(index > -1){
            arr.splice(index, 1);
            //保存到本地
            this.saveData(arr);
            return true;
        }
        
        return false;
    }

}
