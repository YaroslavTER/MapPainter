const settings = {
  /**
   * Map width in tiles
   */
  width: 100,
  /**
   * Map height in tiles
   */
  height: 100,
  cell: {
    /**
     * Cell side size in pixels
     */
    size: 32,
    /**
     * Cell type
     */
    types: []
  },
  canvas: {
    /**
     * Canvas width in pixels
     */
    width: 960,
    /**
     * Canvas height in pixels
     */
    height: 896
  },
  gameSettings: {
    refreshTime: 45
    /**
     * Refresh time in milliseconds
     */
  }
};

export default settings;
