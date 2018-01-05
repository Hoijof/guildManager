export default {
    update(paramName, parent, gp, ggp, value) {
        if (this[ggp]) {
            this[ggp][gp][parent][paramName] = value;
        } else if (this[gp]) {
            this[gp][parent][paramName] = value;
        } else if (this[parent]) {
            this[parent][paramName] = value;
        } else {
            this[paramName] = value;
        }

        return this;
    }
}