import { point, bearing,distance } from '@turf/turf'

    /**
     * 获取两点之间的方位角
     * @param {Array} from  [lng,lat]
     * @param {Array} to    [lng,lat]
     */
  export function getHeading(from,to){
        if(!Array.isArray(from)||!Array.isArray(to)){
           throw new Error('该函数要求Array类型的参数')
        }
         from = point(from)
          to = point(to)
        return bearing(from,to)
    }
    /**
     * 获取两点之间的距离
     * @param {Array} from [lng,lat]
     * @param {Array} to  [lng,lat]
     */
  export function getDistance(from,to){
        if(!Array.isArray(from)||!Array.isArray(to)){
            throw new Error('该函数要求Array类型的参数')
         }
         from = point(from)
         to = point(to)
         return distance(from, to, {units:"meters"})
    } 
    /**
     * 获取俯仰角度
     * @param {Array} from [lng,lat,height]
     * @param {Array} to  [lng,lat,height]
     */
  export function getPitch(from,to){
        if(!Array.isArray(from)||!Array.isArray(to)){
            throw new Error('该函数要求Array类型的参数')
         }
        let fromPoint = from.slice(0,2)
        let toPoint = to.slice(0,2)
        let relativeHeight = Number(toPoint.slice(2,1)) - Number(fromPoint.slice(2,1))
       return (Math['atan']( relativeHeight / getDistance(fromPoint,toPoint)) *180) / Math["PI"];
    }
