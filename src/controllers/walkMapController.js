const WalkMap = require('../models/WalkMap');
const { ApiError } = require('../middleware/errorHandler');

class WalkMapController {
    
    static async getWalkRoute(req, res, next) {
        try {
            const { walkId } = req.params;

            if (!walkId || isNaN(walkId)) {
                throw new ApiError('ID de paseo inválido', 400);
            }

            const mapData = await WalkMap.getWalkRoute(parseInt(walkId));

            res.status(200).json({
                status: 'success',
                data: mapData
            });
        } catch (error) {
            next(error);
        }
    }

    static async saveLocation(req, res, next) {
        try {
            const { walkId } = req.params;
            const { lat, lng } = req.body;

            if (!walkId || isNaN(walkId)) {
                throw new ApiError('ID de paseo inválido', 400);
            }

            if (lat === undefined || lat === null || isNaN(lat)) {
                throw new ApiError('Latitud requerida', 400);
            }

            if (lng === undefined || lng === null || isNaN(lng)) {
                throw new ApiError('Longitud requerida', 400);
            }

            if (lat < -90 || lat > 90) {
                throw new ApiError('Latitud inválida (debe estar entre -90 y 90)', 400);
            }

            if (lng < -180 || lng > 180) {
                throw new ApiError('Longitud inválida (debe estar entre -180 y 180)', 400);
            }

            const savedLocation = await WalkMap.saveLocation(
                parseInt(walkId),
                parseFloat(lat),
                parseFloat(lng)
            );

            res.status(201).json({
                status: 'success',
                message: 'Ubicación guardada exitosamente',
                data: savedLocation
            });
        } catch (error) {
            next(error);
        }
    }

    static async checkMapAvailability(req, res, next) {
        try {
            const { walkId } = req.params;

            if (!walkId || isNaN(walkId)) {
                throw new ApiError('ID de paseo inválido', 400);
            }

            const availability = await WalkMap.checkMapAvailability(parseInt(walkId));

            res.status(200).json({
                status: 'success',
                data: availability
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = WalkMapController;