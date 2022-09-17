import Oss from 'ali-oss';
import moment from 'moment';

const createClient = (config: any) => {
  return new Oss({
    region: config.region,
    // endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket,
  });
};

const headers = {
  // 指定该Object被下载时网页的缓存行为。
  // 'Cache-Control': 'no-cache',
  // 指定该Object被下载时的名称。
  // 'Content-Disposition': 'oss_download.txt',
  // 指定该Object被下载时的内容编码格式。
  // 'Content-Encoding': 'UTF-8',
  // 指定过期时间。
  // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT',
  // 指定Object的存储类型。
  // 'x-oss-storage-class': 'Standard',
  // 指定Object的访问权限。
  // 'x-oss-object-acl': 'private',
  // 设置Object的标签，可同时设置多个标签。
  // 'x-oss-tagging': 'Tag1=1&Tag2=2',
  // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  'x-oss-forbid-overwrite': 'true',
};

export async function ossPut(file: File, config: any) {
  const client = createClient(config);
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    // const result = await client.put('exampleobject.txt', path.normalize(imagePath));
    // https://xiaoyulele.oss-cn-hangzhou.aliyuncs.com/images/${moment().format('YYYY-MM-DD')}/${file.name}?
    const path = `images/${moment().format('YYYY-MM-DD')}/${file.name}`;
    await client.put(path, file, { headers });
    // const result = await client.put('exampleobject.txt', path.normalize('D:\\localpath\\examplefile.txt'), { headers });
    return config.ossUrl + '/' + path;
  } catch (e) {
    return false;
  }
}
